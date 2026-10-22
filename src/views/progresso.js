import { get, commit, exerciciosComHistorico, pontosCarga, topoCarga, volumeSerie, rm1, textoSerie } from '../data.js';
import { esc, num, num1, inteiro, fmt, dataCurta, chaveDia } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui } from '../ui.js';

const PERIODOS = [
  ['1m', '1 mês', 30],
  ['3m', '3 meses', 90],
  ['6m', '6 meses', 180],
  ['tudo', 'Tudo', Infinity],
];

function rotuloDia(ts) {
  const hoje = chaveDia(Date.now());
  const ontem = chaveDia(Date.now() - 86400000);
  const k = chaveDia(ts);
  if (k === hoje) return 'Hoje';
  if (k === ontem) return 'Ontem';
  return dataCurta(ts);
}

function grafico(pts) {
  const W = 340;
  const H = 200;
  const m = { l: 40, r: 16, t: 28, b: 26 };
  const cargas = pts.map((p) => p.carga);
  let min = Math.min(...cargas);
  let max = Math.max(...cargas);
  if (min === max) {
    min -= 5;
    max += 5;
  }
  const folga = (max - min) * 0.15;
  min = Math.max(0, min - folga);
  max += folga;
  const t0 = pts[0].ts;
  const t1 = pts.at(-1).ts;
  const x = (ts) => (t1 === t0 ? (m.l + (W - m.r)) / 2 : m.l + ((ts - t0) / (t1 - t0)) * (W - m.l - m.r));
  const y = (c) => m.t + (1 - (c - min) / (max - min)) * (H - m.t - m.b);

  const ticks = 4;
  const grade = Array.from({ length: ticks }, (_, i) => {
    const v = min + ((max - min) * i) / (ticks - 1);
    return `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" stroke="#262c3b" stroke-width="1"/>
      <text x="${m.l - 6}" y="${y(v) + 4}" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Space Grotesk">${num(Math.round(v * 2) / 2)}</text>`;
  }).join('');

  const caminho = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.ts).toFixed(1)},${y(p.carga).toFixed(1)}`).join(' ');
  const area = `${caminho} L${x(t1).toFixed(1)},${H - m.b} L${x(t0).toFixed(1)},${H - m.b} Z`;
  const pontos = pts.map((p) => `<circle cx="${x(p.ts).toFixed(1)}" cy="${y(p.carga).toFixed(1)}" r="4" fill="#0c0e12" stroke="#d4ff00" stroke-width="2"/>`).join('');

  const idxMax = cargas.indexOf(Math.max(...cargas));
  const ult = pts.at(-1);
  const pr = ult.carga >= Math.max(...cargas) && pts.length > 1;
  const lx = x(ult.ts);
  const ly = y(ult.carga);
  const etiqueta = `${num(ult.carga)} kg${pr ? ' ★' : ''}`;
  const tw = etiqueta.length * 6.4 + 14;
  const tx = Math.min(W - m.r - tw, Math.max(m.l, lx - tw / 2));
  const tooltip = `<rect x="${tx}" y="${ly - 30}" width="${tw}" height="20" rx="6" fill="#d4ff00"/>
    <text x="${tx + tw / 2}" y="${ly - 16}" text-anchor="middle" fill="#0c0e12" font-size="11" font-weight="700" font-family="Space Grotesk">${etiqueta}</text>`;
  void idxMax;

  const nLab = Math.min(4, pts.length);
  const rotulos = Array.from({ length: nLab }, (_, i) => {
    const p = pts[nLab === 1 ? 0 : Math.round((i * (pts.length - 1)) / (nLab - 1))];
    return `<text x="${x(p.ts)}" y="${H - 6}" text-anchor="${i === 0 && nLab > 1 ? 'start' : i === nLab - 1 && nLab > 1 ? 'end' : 'middle'}" fill="#94a3b8" font-size="10" font-family="Space Grotesk">${esc(dataCurta(p.ts))}</text>`;
  }).join('');

  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolução da carga máxima">
    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d4ff00" stop-opacity=".35"/><stop offset="1" stop-color="#d4ff00" stop-opacity="0"/></linearGradient></defs>
    ${grade}
    <path d="${area}" fill="url(#g)"/>
    <path d="${caminho}" fill="none" stroke="#d4ff00" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${pontos}${tooltip}${rotulos}
  </svg>`;
}

function chipsSerie(e) {
  if (e.tipo === 'drop') return `<span class="drop">Drop (${e.partes.map((p) => num(p.carga)).join('/')})</span>`;
  if (e.tipo === 'cluster') return `<span class="drop">Cluster ${num(e.carga)} kg · ${e.partes.map((p) => p.reps).join('+')}</span>`;
  return `<span>${num1(e.partes[0].carga)} × ${e.partes[0].reps}</span>`;
}

export function progresso() {
  const d = get();
  const lista = exerciciosComHistorico();
  const top = `<h1>Progresso</h1>`;
  if (!lista.length) {
    return {
      top,
      html: `<div class="vazio">${icon('trending-up', 40)}<p><b>Ainda não há histórico.</b><br>Finalize um treino e a evolução de carga de cada exercício aparece aqui.</p><a class="btn" href="#/">Ir para o treino</a></div>`,
      nav: true,
    };
  }
  if (!lista.find((x) => x.id === ui.progEx)) ui.progEx = lista[0].id;
  const sel = lista.find((x) => x.id === ui.progEx);
  const [, , dias] = PERIODOS.find((p) => p[0] === ui.periodo) ?? PERIODOS[1];
  const corte = Date.now() - dias * 86400000;

  const todos = pontosCarga(sel.id);
  const pts = todos.filter((p) => p.ts >= corte);
  const sessoes = d.sessoes.filter((s) => s.exercicios[sel.id] && s.exercicios[sel.id].series.some((e) => e.concluida));

  // Estatísticas do período
  const sesPeriodo = sessoes.filter((s) => s.inicio >= corte);
  let melhor1rm = null;
  let volume = 0;
  for (const s of sesPeriodo) {
    for (const e of s.exercicios[sel.id].series) {
      if (!e.concluida) continue;
      volume += volumeSerie(e);
      if (e.tipo === 'cluster') continue;
      const c = topoCarga(e);
      const r = e.partes[0].reps;
      const est = rm1(c, r);
      if (!melhor1rm || est > melhor1rm.est) melhor1rm = { est, c, r };
    }
  }
  const cargaMax = pts.length ? Math.max(...pts.map((p) => p.carga)) : 0;
  const primeira = pts[0]?.carga ?? 0;
  const ultima = pts.at(-1)?.carga ?? 0;
  const variacao = primeira > 0 ? ((ultima - primeira) / primeira) * 100 : 0;

  const botoesPeriodo = PERIODOS.map(([k, nome]) => `<button class="chip ${ui.periodo === k ? 'on' : ''}" data-a="periodo" data-v="${k}">${nome}</button>`).join('');

  const blocoGrafico = pts.length
    ? `<section class="card grafico">
        <div class="row between"><span class="caps ok">● Evolução de carga máxima</span>${pts.length > 1 && ultima >= cargaMax ? `<span class="badge neutro" style="color:var(--lime)">${icon('zap', 12)} Novo PR</span>` : ''}</div>
        <div class="row mt8" style="gap:10px;align-items:baseline"><b class="h-lg">${num(ultima)} kg</b>${pts.length > 1 ? `<span class="ok num" style="font-weight:600">${variacao >= 0 ? '+' : ''}${num(Math.round(variacao * 10) / 10)}%</span>` : ''}</div>
        ${grafico(pts)}
        <p class="sm mute" style="margin:6px 0 0">Séries normais / 1º degrau do drop set. ${pts.length === 1 ? 'Com mais sessões, a linha de evolução aparece.' : ''}</p>
      </section>`
    : `<section class="card"><p class="mute" style="margin:0">Sem sessões deste exercício no período. Escolha “Tudo” para ver o histórico completo.</p></section>`;

  const stats = `<div class="stats3">
      <div class="stat"><span class="caps mute">Carga máx.</span><b>${num(cargaMax)}<small>kg</small></b></div>
      <div class="stat"><span class="caps mute">Melhor série</span><b>${melhor1rm ? melhor1rm.r : '—'}<small>reps</small></b><span class="sm mute">${melhor1rm ? `1RM est.: ${num(Math.round(melhor1rm.est * 10) / 10)} kg` : ''}</span></div>
      <div class="stat"><span class="caps mute">Volume</span><b>${inteiro(volume)}<small>kg</small></b></div>
    </div>`;

  const recentes = [...sessoes]
    .reverse()
    .slice(0, 6)
    .map((s) => {
      const reg = s.exercicios[sel.id];
      const concl = reg.series.filter((e) => e.concluida);
      const vol = concl.reduce((a, e) => a + volumeSerie(e), 0);
      return `<article class="card">
        <div class="row between"><div class="row" style="gap:8px"><b class="h-md">${rotuloDia(s.inicio)}</b><span class="badge neutro">${concl.length} série${concl.length > 1 ? 's' : ''}</span></div>
        <span class="num"><span class="mute sm">VOL:</span> <b class="lime">${inteiro(vol)} kg</b></span></div>
        <div class="sess-chips">${concl.map(chipsSerie).join('')}</div>
        ${reg.nota ? `<p class="sm mute" style="margin:10px 0 0">${icon('notebook-pen', 14)} ${esc(reg.nota)}</p>` : ''}
      </article>`;
    })
    .join('');

  // Recomendação de carga
  const ultSes = sessoes.at(-1);
  let reco = '';
  if (ultSes) {
    const normais = ultSes.exercicios[sel.id].series.filter((e) => e.concluida && e.tipo === 'normal');
    if (normais.length) {
      const c = Math.max(...normais.map(topoCarga));
      const alvo = normais[0].repsMax;
      const bateu = normais.every((e) => e.partes[0].reps >= alvo);
      const passo = d.config.passo;
      reco = `<div class="reco">
        <span class="ic-b">${icon('trending-up', 20)}</span>
        <div><b class="lime" style="font-family:var(--f-display);font-size:12px;letter-spacing:.08em;text-transform:uppercase">Recomendação de carga</b>
        <p style="margin:2px 0 0">${
          bateu
            ? `Você completou ${alvo} reps em todas as séries com ${num(c)} kg. Sugerimos testar <b>${num(c + passo)} kg</b> na primeira série da próxima sessão.`
            : `Mantenha ${num(c)} kg e busque ${alvo} reps em todas as séries antes de subir a carga.`
        }</p></div>
      </div>`;
    }
  }

  const html = `
    <section class="card" style="margin-top:8px"><label class="seletor">
      <span class="icone-q">${icon('dumbbell', 20)}</span>
      <span class="grow"><span class="caps mute" style="display:block">Exercício monitorado</span><b class="h-md" style="font-size:18px">${esc(sel.nome)}</b></span>
      ${icon('chevron-down', 20)}
      <select data-in="prog-ex" aria-label="Escolher exercício">${lista.map((x) => `<option value="${x.id}" ${x.id === sel.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select>
    </label></section>
    <div class="periodos">${botoesPeriodo}</div>
    ${blocoGrafico}
    ${stats}
    <h2 class="section-t"><span class="lime">${icon('history', 20)}</span> Sessões recentes <span class="grow"></span><span class="caps mute">${sessoes.length} registro${sessoes.length === 1 ? '' : 's'}</span></h2>
    ${recentes}
    ${reco}
  `;
  return { top, html, nav: true };
}

registrar(
  {
    periodo: (el) => {
      ui.periodo = el.dataset.v;
      commit(() => {});
    },
  },
  {
    'prog-ex': (ds, valor) => {
      ui.progEx = valor;
      commit(() => {});
    },
  },
);

void fmt;
void textoSerie;
