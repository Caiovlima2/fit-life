import {
  get,
  commit,
  acharExercicio,
  garantirExercicio,
  iniciarSessao,
  sessaoAnterior,
  criarEntrada,
  converterEntrada,
  adicionarDegrau,
  recalcularDrop,
  adicionarAquecimento,
  atualizarConclusao,
  propagarCarga,
  novaSerie,
  topoCarga,
  textoSerie,
  rotuloSerie,
  resumoSeries,
  volumeSerie,
  emBlocos,
  TIPOS,
  INTENSIDADES,
  PRESETS_DESCANSO,
  DESCANSO_AQUECIMENTO,
} from '../data.js';
import { esc, num, mss, lerNumero, fmt, inteiro } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { botaoVideo } from './video.js';
import { registrar, ui, abrirSheet, fecharSheet, toast } from '../ui.js';
import * as timer from '../timer.js';
import { compacta, editor, tendencia } from './serie-ui.js';

/** Chamado pelo roteador antes de desenhar: garante sessão e registro do exercício. */
export function prepararExercicio(id) {
  const achado = acharExercicio(id);
  if (!achado) return;
  commit((d) => {
    if (!d.ativa) iniciarSessao(achado.treino);
    garantirExercicio(d.ativa, achado.ex);
  }, false);
}

const ctx = () => {
  const d = get();
  const { ex, treino } = acharExercicio(ui.exAtual);
  return { d, ex, treino, reg: d.ativa.exercicios[ex.id] };
};

/* ---------- Tela ---------- */

export function exercicio({ id }) {
  const achado = acharExercicio(id);
  const voltar = `<a class="icon-btn" href="#/" aria-label="Voltar">${icon('arrow-left', 24)}</a>`;
  if (!achado) {
    return {
      top: `${voltar}<h1 class="sub">Exercício</h1>`,
      html: `<div class="vazio">${icon('x', 36)}<p>Exercício não encontrado.</p><a class="btn" href="#/">Voltar ao treino</a></div>`,
      nav: false,
    };
  }
  ui.exAtual = id;
  const d = get();
  const { ex, treino } = achado;
  const reg = d.ativa.exercicios[ex.id];
  const ant = sessaoAnterior(ex.id, d.ativa.inicio);
  const passo = d.config.passo;
  const t = d.timer;
  const primeiraPend = reg.series.findIndex((e) => !e.concluida);
  const escolhida = ui.aberta[ex.id];
  const aberta =
    escolhida != null && reg.series[escolhida] && !reg.series[escolhida].concluida ? escolhida : primeiraPend;

  const video = botaoVideo(ex, 'chip', 16);

  const trabalhoAnt = ant ? ant.ex.series.filter((e) => !e.aquecimento) : [];
  const ultima = ant
    ? `<section class="card ultima">
        <div class="row between"><span class="row" style="gap:6px"><span class="lime">${icon('history', 16)}</span><b>Última vez</b> <span class="mute">(${fmt(ant.sessao.inicio, { day: 'numeric', month: 'short' }).replace('.', '')})</span></span>
        <span class="caps ok">Vol. ${inteiro(ant.ex.series.reduce((s, e) => s + volumeSerie(e), 0))} kg</span></div>
        <div class="grid">${trabalhoAnt
          .map((e, k) => {
            const hojeE = reg.series.filter((x) => !x.aquecimento)[k];
            const tr = hojeE?.concluida ? tendencia(hojeE, e) : '';
            return `<div class="it"><span class="mute">S${k + 1}</span> <b>${esc(textoSerie(e, num))}</b> ${tr}</div>`;
          })
          .join('')}</div>
      </section>`
    : `<section class="card"><div class="row" style="gap:8px"><span class="lime">${icon('sparkles', 18)}</span><span class="mute">Primeira vez neste exercício. Os valores que você registrar hoje viram a referência da próxima sessão.</span></div></section>`;

  const series = reg.series
    .map((e, i) => {
      if (i === aberta) {
        const refUlt = ant ? (ant.ex.series[i] ?? ant.ex.series.at(-1)) : null;
        return editor(ex, reg, i, passo, refUlt, t);
      }
      return compacta(ex, reg, i, t);
    })
    .join('');

  const idx = treino.exercicios.findIndex((x) => x.id === ex.id);
  const prox = treino.exercicios[idx + 1];
  const todas = reg.series.every((e) => e.concluida);
  const proximo = prox
    ? `<a class="card row between" href="#/exercicio/${prox.id}" style="${todas ? 'border-color:var(--lime-t)' : ''}">
        <div><span class="caps mute">Próximo exercício</span><div class="h-md" style="margin-top:2px">${esc(prox.nome)}</div></div>
        <span class="icon-btn" style="background:var(--inset)">${icon('arrow-right', 20)}</span></a>`
    : `<a class="card row between" href="#/" style="${todas ? 'border-color:var(--lime-t)' : ''}">
        <div><span class="caps mute">Último exercício</span><div class="h-md" style="margin-top:2px">Voltar e finalizar o treino</div></div>
        <span class="icon-btn" style="background:var(--inset)">${icon('arrow-right', 20)}</span></a>`;

  const html = `
    <section style="margin-top:8px">
      ${ex.grupo ? `<div class="caps lime">${esc(ex.grupo)}</div>` : ''}
      <h2 class="h-lg" style="margin-top:4px">${esc(ex.nome)}</h2>
      <div class="mt8"><span class="badge lime" style="text-transform:none;letter-spacing:0;font-size:13px">${esc(resumoSeries(ex.series))}</span></div>
      <div class="row wrap mt12" style="gap:8px">
        <span class="badge ${esc(ex.intensidade)}">${INTENSIDADES[ex.intensidade] ?? ex.intensidade}</span>
        <button class="chip" data-a="editar-descanso">${icon('timer', 16)} Descanso: ${mss(ex.descanso)} ${icon('pencil', 12)}</button>
        ${video}
      </div>
      ${ex.nota ? `<div class="nota mt12" style="margin-bottom:12px">${icon('lightbulb', 16)}<span>${esc(ex.nota)}</span></div>` : '<div class="mt12"></div>'}
    </section>
    ${ultima}
    <div class="row between" style="margin:16px 0 8px"><span class="caps mute">Execução · Séries</span><span class="sm mute">${reg.series.filter((e) => e.concluida).length}/${reg.series.length} concluídas</span></div>
    <button class="dash-btn" data-a="add-aquecimento">${icon('plus', 18)} Série de aquecimento</button>
    ${series}
    <button class="btn sec" data-a="add-serie">${icon('plus', 20)} Adicionar série</button>
    <div class="card mt16">
      <label class="caps mute" for="nota-ex">Anotações do exercício</label>
      <textarea id="nota-ex" class="field mt8" data-in="nota-ex" placeholder="Ex.: banco na inclinação 3, pegada neutra…">${esc(reg.nota)}</textarea>
    </div>
    ${proximo}
  `;

  return { top: `${voltar}<h1 class="sub">Detalhes do exercício</h1>`, html, nav: false };
}

/* ---------- Esforço percebido (RPE) ---------- */

const ESCALA_RPE = {
  6: 'Moderado: ainda sobrariam cerca de 4 repetições.',
  7: 'Pesado: sobrariam cerca de 3 repetições.',
  8: 'Pesado, mas com cerca de 2 repetições sobrando.',
  9: 'No limite: 1 repetição sobrando.',
  10: 'Falha total: nenhuma repetição sobrando.',
};

function sheetRpe() {
  const { reg } = ctx();
  const { i, v } = ui.rpe;
  abrirSheet(`
    <div class="caps ok">${rotuloSerie(reg.series, i)} salva</div>
    <h2 class="h-md" style="margin-top:2px">Quão pesada foi?</h2>
    <p class="mute" style="margin:2px 0 12px">Esforço percebido (RPE). Opcional.</p>
    <div class="rpe-escala" role="group" aria-label="RPE de 6 a 10">
      ${Object.keys(ESCALA_RPE)
        .map(
          (n) =>
            `<button class="${Number(n) === v ? 'on' : ''}" data-a="rpe-sel" data-v="${n}" aria-pressed="${Number(n) === v}">${n}</button>`,
        )
        .join('')}
    </div>
    <div class="rpe-leg"><b>RPE ${v}</b><span>${ESCALA_RPE[v]}</span></div>
    <p class="sm mute" style="margin:10px 0 0">Notas 9 e 10 seguram a sugestão de carga na próxima vez.</p>
    <button class="btn mt16" data-a="rpe-salvar">Salvar esforço</button>
    <button class="btn sec mt8" data-a="fechar">Pular</button>`);
}

/* ---------- Ações ---------- */

function descansar(i) {
  const { d, ex, reg, treino } = ctx();
  if (!d.config.autoDescanso) return;
  const aquecimento = reg.series[i].aquecimento;
  const prox = reg.series.findIndex((e) => !e.concluida);
  let proxima;
  if (prox >= 0) {
    proxima = { texto: `${rotuloSerie(reg.series, prox)} · ${textoSerie(reg.series[prox], num)}`, exId: ex.id };
  } else {
    const nx = treino.exercicios[treino.exercicios.findIndex((x) => x.id === ex.id) + 1];
    proxima = nx
      ? { texto: `Próximo exercício: ${nx.nome}`, exId: nx.id }
      : { texto: 'Treino completo! Finalize na tela inicial.', exId: null };
  }
  timer.iniciar({
    seg: aquecimento ? DESCANSO_AQUECIMENTO : ex.descanso,
    tipo: 'descanso',
    ref: { exId: ex.id, idx: i },
    proxima,
  });
}

function concluir(i) {
  const { d, reg } = ctx();
  const exId = ui.exAtual;
  commit(() => {
    atualizarConclusao(d.ativa, exId, i);
    propagarCarga(d.ativa.exercicios[exId], i);
  }, false);
  ui.aberta[exId] = undefined;
  ui.rolarAtiva = true;
  descansar(i);
  if (d.config.vibracao) timer.vibrar(30);
  if (d.config.rpe && !reg.series[i].aquecimento) {
    ui.rpe = { i, v: 8 };
    sheetRpe();
  }
}

function redesenhar() {
  commit(() => {});
}

/** Há um cronômetro de série por tempo rodando para esta série? */
const cronometroDe = (i) => {
  const t = get().timer;
  return !!t && t.tipo === 'tempo' && t.ref?.exId === ui.exAtual && t.ref.idx === i;
};

/** Marca a série como feita e segue para o descanso. */
function salvarSerie(i) {
  const { reg } = ctx();
  const e = reg.series[i];
  const parte = e.partes[0];
  if (e.tipo === 'tempo' ? !(parte.segundos > 0) : !(parte.reps > 0)) {
    return toast(e.tipo === 'tempo' ? 'Informe o tempo' : 'Informe as repetições');
  }
  if (cronometroDe(i)) timer.dispensar();
  commit(() => {
    parte.ok = true;
  }, false);
  concluir(i);
  redesenhar();
}

const TECNICAS_ESCOLHA = [
  ['normal', 'Carga e repetições fixas.'],
  ['drop', 'Degraus de carga menor, sem descanso.'],
  ['cluster', 'Mini-blocos com pausa curta entre eles.'],
  ['restpause', 'Vai até a falha, pausa curta e continua.'],
  ['tempo', 'Segurar por segundos, com cronômetro.'],
];

const NOVAS = new Set(['restpause', 'tempo']);
const selo = (k) => (NOVAS.has(k) ? '<em class="novo">NOVO</em>' : '');

registrar(
  {
    'abrir-serie': (el) => {
      ui.aberta[ui.exAtual] = Number(el.dataset.i);
      ui.rolarAtiva = true;
      redesenhar();
    },
    passo: (el) => {
      const { campo, i, p, d: dir } = el.dataset;
      const { d, reg } = ctx();
      const e = reg.series[Number(i)];
      const sentido = Number(dir);
      commit(() => {
        e.auto = false;
        delete e.sugestao;
        if (campo === 'cargaCluster')
          e.carga = Math.max(0, Math.round(((e.carga || 0) + sentido * d.config.passo) * 100) / 100);
        else if (campo === 'carga') {
          const parte = e.partes[Number(p)];
          parte.carga = Math.max(0, Math.round(((parte.carga || 0) + sentido * d.config.passo) * 100) / 100);
        } else if (campo === 'segundos') {
          const parte = e.partes[Number(p)];
          parte.segundos = Math.max(5, (parte.segundos || 0) + sentido * 5);
        } else {
          const parte = e.partes[Number(p)];
          parte.reps = Math.max(0, (parte.reps || 0) + sentido);
        }
      });
    },
    salvar: (el) => salvarSerie(Number(el.dataset.i)),
    'ok-parte': (el) => {
      const i = Number(el.dataset.i);
      const k = Number(el.dataset.p);
      const { d, reg } = ctx();
      const e = reg.series[i];
      const parte = e.partes[k];
      if (!parte.ok && !(parte.reps > 0)) return toast('Informe as repetições');
      commit(() => {
        parte.ok = !parte.ok;
      }, false);
      if (parte.ok && d.config.vibracao) timer.vibrar(20);
      const completa = e.partes.every((x) => x.ok);
      if (parte.ok && completa) concluir(i);
      else if (parte.ok && emBlocos(e.tipo)) timer.iniciar({ seg: e.pausa, tipo: 'pausa' });
      redesenhar();
    },
    'manter-carga': (el) => {
      const e = ctx().reg.series[Number(el.dataset.i)];
      commit(() => {
        e.partes[0].carga = e.sugestao.de;
        delete e.sugestao;
      });
    },
    'add-degrau': (el) => {
      const e = ctx().reg.series[Number(el.dataset.i)];
      commit(() => adicionarDegrau(e));
    },
    'set-reducao': (el) => {
      const e = ctx().reg.series[Number(el.dataset.i)];
      commit(() => recalcularDrop(e, Number(el.dataset.v)));
    },
    'add-bloco': (el) => {
      const e = ctx().reg.series[Number(el.dataset.i)];
      commit(() => e.partes.push({ reps: e.partes.at(-1)?.reps ?? e.repsMax, ok: false }));
    },
    'rem-parte': (el) => {
      const e = ctx().reg.series[Number(el.dataset.i)];
      commit(() => e.partes.pop());
    },
    reabrir: (el) => {
      const i = Number(el.dataset.i);
      const e = ctx().reg.series[i];
      commit(() => {
        e.partes.forEach((p) => (p.ok = false));
        e.concluida = false;
        e.recorde = false;
        delete e.descansoReal;
        delete e.rpe;
      }, false);
      ui.aberta[ui.exAtual] = i;
      ui.rolarAtiva = true;
      redesenhar();
    },

    /* técnica da série */
    tec: (el) => {
      const i = Number(el.dataset.i);
      const { reg } = ctx();
      const e = reg.series[i];
      abrirSheet(`
        <h2 class="h-md">Técnica de ${rotuloSerie(reg.series, i)}</h2>
        <p class="mute" style="margin:6px 0 14px">Vale só para esta série, neste treino.</p>
        ${TECNICAS_ESCOLHA.map(
          ([k, desc]) =>
            `<button class="op ${e.tipo === k && !e.aquecimento ? 'on' : ''}" data-a="set-tec" data-i="${i}" data-tipo="${k}"><div class="grow"><b>${TIPOS[k]}${selo(k)}</b><span>${desc}</span></div>${e.tipo === k && !e.aquecimento ? icon('check', 20, 'lime') : ''}</button>`,
        ).join('')}
        <div class="sep"></div>
        <button class="op ${e.aquecimento ? 'on' : ''}" data-a="set-aq" data-i="${i}" role="switch" aria-checked="${!!e.aquecimento}"><div class="grow"><b>Série de aquecimento<em class="novo">NOVO</em></b><span>Fica fora de recordes, volume e sugestão.</span></div><span class="switch ${e.aquecimento ? 'on' : ''}"></span></button>`);
    },
    'set-tec': (el) => {
      const i = Number(el.dataset.i);
      const { reg } = ctx();
      commit(() => {
        reg.series[i] = converterEntrada({ ...reg.series[i], aquecimento: false }, el.dataset.tipo);
      }, false);
      ui.aberta[ui.exAtual] = i;
      fecharSheet();
      redesenhar();
    },
    'set-aq': (el) => {
      const i = Number(el.dataset.i);
      const { reg } = ctx();
      const virar = !reg.series[i].aquecimento;
      commit(() => {
        reg.series[i] = virar
          ? { ...converterEntrada(reg.series[i], 'normal'), aquecimento: true }
          : { ...reg.series[i], aquecimento: false };
      }, false);
      ui.aberta[ui.exAtual] = i;
      fecharSheet();
      redesenhar();
    },

    /* novas séries */
    'add-aquecimento': () => {
      const { d, ex, reg } = ctx();
      const anterior = sessaoAnterior(ex.id, d.ativa.inicio)?.ex ?? null;
      let pos = 0;
      commit(() => {
        pos = adicionarAquecimento(reg, anterior);
        const t = d.timer;
        if (t?.ref?.exId === ex.id && t.ref.idx >= pos) t.ref.idx++; // o timer segue apontando para a mesma série
      }, false);
      ui.aberta[ex.id] = pos;
      ui.rolarAtiva = true;
      redesenhar();
    },
    'add-serie': () => {
      abrirSheet(`
        <h2 class="h-md">Adicionar série</h2>
        <p class="mute" style="margin:6px 0 14px">Escolha a técnica da nova série.</p>
        ${TECNICAS_ESCOLHA.map(
          ([k]) =>
            `<button class="op" data-a="nova-serie" data-tipo="${k}"><div class="grow"><b>${TIPOS[k]}${selo(k)}</b></div>${icon('plus', 20)}</button>`,
        ).join('')}`);
    },
    'nova-serie': (el) => {
      const { reg } = ctx();
      const ult = reg.series.findLast((e) => !e.aquecimento && e.tipo !== 'tempo') ?? reg.series.at(-1);
      commit(() => {
        const p = novaSerie(el.dataset.tipo, ult?.repsMin ?? 10, ult?.repsMax ?? 12);
        const base = ult ? { tipo: 'normal', partes: [{ carga: topoCarga(ult), reps: ult.partes[0]?.reps }] } : null;
        reg.series.push(criarEntrada(p, base, { extra: true }));
      }, false);
      ui.aberta[ui.exAtual] = reg.series.length - 1;
      ui.rolarAtiva = true;
      fecharSheet();
      redesenhar();
    },

    /* série por tempo */
    'tempo-iniciar': (el) => {
      const i = Number(el.dataset.i);
      const { ex, reg } = ctx();
      const seg = reg.series[i].partes[0].segundos;
      timer.destravarAudio();
      timer.iniciar({
        seg,
        tipo: 'tempo',
        ref: { exId: ex.id, idx: i },
        proxima: { texto: `${rotuloSerie(reg.series, i)}: tempo concluído. Toque em Concluir série.`, exId: ex.id },
      });
      redesenhar();
    },
    'tempo-pausar': () => {
      if (timer.emPausa()) timer.retomar();
      else timer.pausar();
      redesenhar();
    },
    'tempo-concluir': (el) => salvarSerie(Number(el.dataset.i)),

    /* descanso do exercício */
    'editar-descanso': () => {
      const { ex } = ctx();
      abrirSheet(`
        <h2 class="h-md">Descanso deste exercício</h2>
        <p class="mute" style="margin:6px 0 14px">O timer usa este tempo ao concluir cada série. Fica salvo no treino.</p>
        <div class="presets">${PRESETS_DESCANSO.map((s) => `<button class="${ex.descanso === s ? 'on' : ''}" data-a="set-descanso" data-v="${s}">${mss(s)}</button>`).join('')}</div>
        <div class="row between mt16">
          <button class="btn sec sm" data-a="set-descanso" data-v="${Math.max(15, ex.descanso - 15)}">−15s</button>
          <b class="h-md num">${mss(ex.descanso)}</b>
          <button class="btn sec sm" data-a="set-descanso" data-v="${ex.descanso + 15}">+15s</button>
        </div>
        <button class="btn mt16" data-a="fechar">Pronto</button>`);
    },
    'set-descanso': (el) => {
      const { ex } = ctx();
      commit(() => {
        ex.descanso = Number(el.dataset.v);
      }, false);
      document.querySelector('[data-a="editar-descanso"]')?.click();
      redesenhar();
    },

    /* RPE */
    'rpe-sel': (el) => {
      ui.rpe.v = Number(el.dataset.v);
      sheetRpe();
    },
    'rpe-salvar': () => {
      const { reg } = ctx();
      const e = reg.series[ui.rpe.i];
      commit(() => {
        if (e) e.rpe = ui.rpe.v;
      }, false);
      fecharSheet();
      redesenhar();
    },
  },
  {
    carga: (ds, valor) => {
      const e = ctx().reg.series[Number(ds.i)];
      commit(() => {
        e.auto = false;
        delete e.sugestao;
        e.partes[Number(ds.p)].carga = lerNumero(valor) ?? 0;
      }, false);
    },
    cargaCluster: (ds, valor) => {
      const e = ctx().reg.series[Number(ds.i)];
      commit(() => {
        e.auto = false;
        e.carga = lerNumero(valor) ?? 0;
      }, false);
    },
    reps: (ds, valor) => {
      const e = ctx().reg.series[Number(ds.i)];
      commit(() => {
        e.partes[Number(ds.p)].reps = Math.max(0, Math.round(lerNumero(valor) ?? 0));
      }, false);
    },
    segundos: (ds, valor) => {
      const e = ctx().reg.series[Number(ds.i)];
      commit(() => {
        e.partes[Number(ds.p)].segundos = Math.max(0, Math.round(lerNumero(valor) ?? 0));
      }, false);
    },
    'nota-ex': (ds, valor) => {
      const { reg } = ctx();
      commit(() => {
        reg.nota = valor;
      }, false);
    },
  },
);
