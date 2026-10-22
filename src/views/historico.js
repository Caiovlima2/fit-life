import { get, commit, diasTreinados, resumoSessao, topoCarga, textoSerie, TIPOS, ehSessaoFeita } from '../data.js';
import { esc, num, num1, mss, inteiro, fmt, hora, chaveDia, duracao, inicioDaSemana } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui, confirmar, toast, ir } from '../ui.js';

const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function mesAtual() {
  if (!ui.mes) {
    const h = new Date();
    ui.mes = { ano: h.getFullYear(), mes: h.getMonth() };
  }
  return ui.mes;
}

function rotuloData(ts) {
  const k = chaveDia(ts);
  const sem = fmt(ts, { weekday: 'long' });
  const base = fmt(ts, { day: '2-digit', month: 'short' }).replace('.', '').toUpperCase();
  if (k === chaveDia(Date.now())) return `HOJE · ${base}`;
  return `${base} · ${sem.toUpperCase()}`;
}

/** Semanas seguidas (terminando agora) que bateram a meta semanal. */
function sequenciaSemanas(feitas, meta) {
  const porSemana = new Map();
  for (const s of feitas) {
    const k = inicioDaSemana(s.inicio);
    porSemana.set(k, (porSemana.get(k) ?? 0) + 1);
  }
  const semanaAtual = inicioDaSemana(Date.now());
  const bateu = (k) => (porSemana.get(k) ?? 0) >= meta;
  let k = semanaAtual;
  let n = 0;
  if (!bateu(k)) k -= 7 * 86400000; // a semana corrente ainda pode ser concluída
  while (bateu(k)) {
    n++;
    k -= 7 * 86400000;
  }
  const pilulas = Array.from({ length: 5 }, (_, i) => bateu(semanaAtual - (4 - i) * 7 * 86400000));
  return { n, pilulas };
}

export function historico() {
  const d = get();
  const feitas = d.sessoes.filter(ehSessaoFeita);
  const { ano, mes } = mesAtual();
  const primeiro = new Date(ano, mes, 1);
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const dias = diasTreinados();
  const hojeK = chaveDia(Date.now());
  const meta = d.config.metaSemanal;

  const doMes = feitas.filter((s) => {
    const dt = new Date(s.inicio);
    return dt.getFullYear() === ano && dt.getMonth() === mes;
  });
  const volMes = doMes.reduce((a, s) => a + resumoSessao(s).volume, 0);
  const agora = new Date();
  const decorridos = agora.getFullYear() === ano && agora.getMonth() === mes ? agora.getDate() : diasNoMes;
  const esperado = (meta * decorridos) / 7;
  const freq = esperado >= 1 ? Math.min(100, Math.round((doMes.length / esperado) * 100)) : null;
  const { n: seq, pilulas } = sequenciaSemanas(feitas, meta);

  // Grade do calendário
  const celulas = [];
  for (let i = 0; i < primeiro.getDay(); i++) celulas.push('<span></span>');
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const k = chaveDia(new Date(ano, mes, dia).getTime());
    const tem = dias.has(k) && dias.get(k).some(ehSessaoFeita);
    celulas.push(
      `<button class="dia ${tem ? 'tem' : ''} ${k === hojeK ? 'hoje' : ''} ${ui.dia === k ? 'sel' : ''}" data-a="dia" data-k="${k}" aria-label="${dia} ${tem ? '(treinou)' : ''}">${dia}</button>`,
    );
  }

  const lista = (ui.dia ? feitas.filter((s) => chaveDia(s.inicio) === ui.dia) : [...feitas].reverse().slice(0, 10)).slice();
  if (!ui.dia) lista.sort((a, b) => b.inicio - a.inicio);
  const cartoes = lista
    .map((s) => {
      const r = resumoSessao(s);
      const treino = d.treinos.find((t) => t.id === s.treinoId);
      const totalEx = treino ? treino.exercicios.length : Object.keys(s.exercicios).length;
      const nomes = Object.values(s.exercicios).map((x) => x.nome).join(', ');
      return `<a class="card sess-card" href="#/sessao/${s.id}" style="display:block">
        <div class="row between wrap">
          <span class="row" style="gap:8px"><span class="badge ${chaveDia(s.inicio) === hojeK ? 'lime' : 'neutro'}">${esc(rotuloData(s.inicio))}</span><span class="sm mute">Finalizado às ${hora(s.fim ?? s.inicio)}</span></span>
          <span class="icon-btn" style="width:40px;height:40px;background:var(--inset)">${icon('arrow-right', 18)}</span>
        </div>
        <h3 class="h-md mt8" style="font-size:20px">${esc(s.nome)}</h3>
        <div class="nums">
          <div><span class="caps k">Duração</span><b>${duracao(r.duracao)}</b></div>
          <div><span class="caps k">Carga total</span><b class="lime">${inteiro(r.volume)}<small class="mute" style="font-size:12px"> kg</small></b></div>
          <div><span class="caps k">Exercícios</span><b class="ok">${r.feitos}/${Math.max(totalEx, r.feitos)}</b></div>
          ${r.recordes ? `<div><span class="caps k">Recordes</span><b style="color:var(--lime)">${r.recordes} ${icon('trophy', 16)}</b></div>` : ''}
        </div>
        <p class="sm mute" style="margin:10px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${icon('circle-check', 14)} ${esc(nomes)}</p>
      </a>`;
    })
    .join('');

  const mesNome = fmt(primeiro.getTime(), { month: 'long', year: 'numeric' });
  const html = `
    <section class="card fire" style="margin-top:8px">
      <span class="ic-b">${icon('flame', 28)}</span>
      <div class="grow"><b class="h-lg" style="font-size:22px">${seq} ${seq === 1 ? 'semana' : 'semanas'}</b> ${seq ? '<span class="badge neutro" style="color:var(--ok)">No ritmo</span>' : ''}
      <div class="sm mute">${seq ? `Sequência batendo a meta de ${meta}x/sem` : `Meta: ${meta} treinos por semana (ajuste em Ajustes)`}</div></div>
      <div class="pills" aria-hidden="true">${pilulas.map((p) => `<i class="${p ? 'on' : ''}"></i>`).join('')}</div>
    </section>
    <section class="card">
      <div class="cal-h">
        <button class="icon-btn" data-a="mes" data-d="-1" aria-label="Mês anterior">${icon('chevron-left', 22)}</button>
        <div style="text-align:center"><b class="h-md">${esc(mesNome.charAt(0).toUpperCase() + mesNome.slice(1))}</b></div>
        <button class="icon-btn" data-a="mes" data-d="1" aria-label="Próximo mês">${icon('chevron-right', 22)}</button>
      </div>
      <div class="stats3 mt12" style="margin-bottom:0">
        <div class="stat"><span class="caps mute">Treinos</span><b>${doMes.length}</b></div>
        <div class="stat"><span class="caps mute">Frequência</span><b class="ok">${freq == null ? '—' : freq + '%'}</b></div>
        <div class="stat"><span class="caps mute">Volume</span><b class="lime">${volMes >= 1000 ? num(Math.round(volMes / 100) / 10) + '<small>t</small>' : inteiro(volMes) + '<small>kg</small>'}</b></div>
      </div>
      <div class="cal-grid">${DOW.map((x) => `<span class="dow">${x}</span>`).join('')}${celulas.join('')}</div>
    </section>
    <h2 class="section-t"><span class="lime">${icon('history', 20)}</span> ${ui.dia ? `Treinos de ${esc(fmt(new Date(ui.dia + 'T12:00:00').getTime(), { day: 'numeric', month: 'long' }))}` : 'Sessões recentes'}
      <span class="grow"></span>${ui.dia ? `<button class="link-btn" data-a="dia" data-k="${ui.dia}">Limpar</button>` : `<span class="caps mute">Exibindo ${lista.length} de ${feitas.length}</span>`}</h2>
    ${cartoes || `<div class="vazio">${icon('calendar', 36)}<p>${ui.dia ? 'Nenhum treino neste dia.' : 'Seus treinos finalizados aparecem aqui.'}</p></div>`}
    ${feitas.length ? `<button class="btn sec mt8" data-a="csv">${icon('download', 18)} Exportar relatório (CSV)</button>` : ''}
  `;
  return { top: '<h1>Histórico</h1>', html, nav: true };
}

/* ---------- Detalhe da sessão ---------- */

export function sessao({ id }) {
  const d = get();
  const s = d.sessoes.find((x) => x.id === id);
  const voltar = `<a class="icon-btn" href="#/historico" aria-label="Voltar">${icon('arrow-left', 24)}</a>`;
  if (!s) return { top: `${voltar}<h1 class="sub">Treino</h1>`, html: `<div class="vazio"><p>Sessão não encontrada.</p><a class="btn" href="#/historico">Voltar</a></div>`, nav: false };
  const r = resumoSessao(s);
  const exs = Object.entries(s.exercicios)
    .map(([, reg]) => {
      const linhas = reg.series
        .map((e, i) => {
          const detalhe =
            e.tipo === 'normal'
              ? `${num1(e.partes[0].carga)} kg × ${e.partes[0].reps}`
              : esc(textoSerie(e, num));
          return `<div class="row between" style="padding:8px 0;border-top:1px solid var(--line)">
            <span><b class="num">Série ${i + 1}</b> <span class="badge ${e.tipo === 'normal' ? 'neutro' : 'tec'}" style="margin-left:4px">${TIPOS[e.tipo]}</span> ${e.recorde ? `<span class="badge recorde">${icon('trophy', 12)}</span>` : ''}</span>
            <span class="num" style="text-align:right"><b>${detalhe}</b>${e.descansoReal != null ? `<span class="sm mute" style="display:block">descansou ${mss(e.descansoReal)}</span>` : ''}</span>
          </div>`;
        })
        .join('');
      return `<section class="card"><h3 class="h-md">${esc(reg.nome)}</h3>${linhas}${reg.nota ? `<p class="sm mute" style="margin:10px 0 0">${icon('notebook-pen', 14)} ${esc(reg.nota)}</p>` : ''}</section>`;
    })
    .join('');
  const html = `
    <section class="card hl" style="margin-top:8px">
      <span class="badge neutro">${esc(rotuloData(s.inicio))}</span>
      <h2 class="h-lg mt8">${esc(s.nome)}</h2>
      <div class="sess-card"><div class="nums">
        <div><span class="caps k">Duração</span><b>${duracao(r.duracao)}</b></div>
        <div><span class="caps k">Carga total</span><b class="lime">${inteiro(r.volume)} kg</b></div>
        <div><span class="caps k">Séries</span><b>${r.series}</b></div>
        ${r.recordes ? `<div><span class="caps k">Recordes</span><b class="lime">${r.recordes}</b></div>` : ''}
      </div></div>
    </section>
    ${exs}
    <button class="btn sec danger mt8" data-a="del-sessao" data-id="${s.id}">${icon('trash-2', 18)} Excluir este registro</button>`;
  return { top: `${voltar}<h1 class="sub">Treino registrado</h1>`, html, nav: false };
}

/* ---------- CSV ---------- */

export function gerarCSV() {
  const linhas = [['data', 'treino', 'exercicio', 'serie', 'tecnica', 'parte', 'carga_kg', 'reps', 'descanso_real_s', 'recorde']];
  for (const s of get().sessoes) {
    const dia = chaveDia(s.inicio);
    for (const reg of Object.values(s.exercicios)) {
      reg.series.forEach((e, i) => {
        if (!e.concluida) return;
        e.partes.forEach((p, k) => {
          linhas.push([dia, s.nome, reg.nome, i + 1, TIPOS[e.tipo], k + 1, e.tipo === 'cluster' ? e.carga : p.carga, p.reps, e.descansoReal ?? '', e.recorde ? 'sim' : '']);
        });
      });
    }
  }
  const cel = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return '﻿' + linhas.map((l) => l.map(cel).join(';')).join('\n');
}

export function baixar(nome, conteudo, tipo) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

registrar({
  mes: (el) => {
    const m = mesAtual();
    const dt = new Date(m.ano, m.mes + Number(el.dataset.d), 1);
    ui.mes = { ano: dt.getFullYear(), mes: dt.getMonth() };
    ui.dia = null;
    commit(() => {});
  },
  dia: (el) => {
    ui.dia = ui.dia === el.dataset.k ? null : el.dataset.k;
    commit(() => {});
  },
  csv: () => {
    baixar(`fit-life-${chaveDia(Date.now())}.csv`, gerarCSV(), 'text/csv;charset=utf-8');
    toast('Relatório exportado');
  },
  'del-sessao': (el) =>
    confirmar({
      titulo: 'Excluir este registro?',
      texto: 'O treino sai do histórico e dos gráficos. Não dá para desfazer.',
      ok: 'Excluir registro',
      fn: () => {
        commit((d) => (d.sessoes = d.sessoes.filter((s) => s.id !== el.dataset.id)), false);
        ir('#/historico');
        toast('Registro excluído');
      },
    }),
});

void topoCarga;
