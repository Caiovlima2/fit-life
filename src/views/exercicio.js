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
  atualizarConclusao,
  propagarCarga,
  novaSerie,
  topoCarga,
  textoSerie,
  repsTxt,
  resumoSeries,
  volumeSerie,
  TIPOS,
  INTENSIDADES,
  PRESETS_DESCANSO,
} from '../data.js';
import { esc, num, num1, mss, mmss, lerNumero, fmt, inteiro } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui, abrirSheet, fecharSheet, toast } from '../ui.js';
import * as timer from '../timer.js';

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

/* ---------- Peças de interface ---------- */

function stepperGrande({ campo, i, p = 0, valor, passo, un, casas }) {
  const txt = casas === 1 ? num1(valor) : String(Math.round(valor || 0));
  return `<div class="stepper">
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="-1" aria-label="Diminuir">−${num(passo)}</button>
    <div class="valor"><input class="num-input" inputmode="${casas === 1 ? 'decimal' : 'numeric'}" data-in="${campo}" data-i="${i}" data-p="${p}" data-fmt="${casas}" value="${txt}" aria-label="${campo === 'reps' ? 'Repetições' : 'Carga em kg'}"><span class="un">${un}</span></div>
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="1" aria-label="Aumentar">+${num(passo)}</button>
  </div>`;
}

function stepperMini({ campo, i, p = 0, valor, casas }) {
  const txt = casas === 1 ? num1(valor) : String(Math.round(valor || 0));
  return `<div class="stepper-mini">
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="-1" aria-label="Diminuir">−</button>
    <div class="valor"><input class="num-input" inputmode="${casas === 1 ? 'decimal' : 'numeric'}" data-in="${campo}" data-i="${i}" data-p="${p}" data-fmt="${casas}" value="${txt}" aria-label="${campo === 'reps' ? 'Repetições' : 'Carga em kg'}"></div>
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="1" aria-label="Aumentar">+</button>
  </div>`;
}

function tendencia(hojeE, antes) {
  const dc = topoCarga(hojeE) - topoCarga(antes);
  if (Math.abs(dc) > 0.001) return dc > 0 ? `<span class="trend up">↑ +${num(dc)}</span>` : `<span class="trend dn">↓ ${num(dc)}</span>`;
  const dr = (hojeE.partes[0]?.reps ?? 0) - (antes.partes[0]?.reps ?? 0);
  if (dr > 0) return `<span class="trend up">↑ +${dr} rep</span>`;
  if (dr < 0) return `<span class="trend dn">↓ ${dr} rep</span>`;
  return `<span class="trend eq">=</span>`;
}

function cabecalho(e, i, ativaAgora) {
  const meta = e.tipo === 'cluster' ? `${e.partes.length} × ${repsTxt(e)} reps` : `${repsTxt(e)} reps`;
  const chip = e.concluida
    ? `<span class="tec-chip ${e.tipo}">${TIPOS[e.tipo]}</span>`
    : `<button class="tec-chip ${e.tipo}" data-a="tec" data-i="${i}" aria-label="Mudar técnica da série ${i + 1}">${TIPOS[e.tipo]} ${icon('chevron-down', 12)}</button>`;
  return `<div class="serie-h">
    <span class="t">Série ${i + 1}</span>${chip}
    ${e.recorde ? `<span class="badge recorde">${icon('trophy', 12)} Recorde</span>` : ''}
    ${e.extra ? '<span class="badge neutro">Extra</span>' : ''}
    <span class="grow"></span>
    ${ativaAgora ? '<span class="caps lime">Em andamento</span>' : `<span class="sm mute">Meta: ${meta}</span>`}
  </div>`;
}

function linhaDescanso(e, i, ex, t) {
  if (!e.concluida) return '';
  const aqui = t && t.tipo === 'descanso' && t.ref && t.ref.exId === ex.id && t.ref.idx === i;
  if (aqui && !t.terminou) {
    return `<div class="descanso-real">${icon('timer', 14)} Descansando… <b class="num lime" data-timer-t>${mmss(timer.restanteSeg())}</b></div>`;
  }
  if (e.descansoReal != null) {
    return `<div class="descanso-real">${icon('circle-check', 14)} Concluído · descansou ${mss(e.descansoReal)} <span class="sub">(meta ${mss(ex.descanso)})</span></div>`;
  }
  return `<div class="descanso-real">${icon('circle-check', 14)} Concluído</div>`;
}

function compacta(ex, reg, i, t) {
  const e = reg.series[i];
  const corpo =
    e.tipo === 'normal'
      ? `<div class="serie-resumo">
          <div><span class="caps k">Carga</span><div class="v">${num1(e.partes[0].carga)}<small>kg</small></div></div>
          <div><span class="caps k">Reps</span><div class="v">${e.partes[0].reps}</div></div>
          <span class="grow"></span>
          <span class="check ${e.concluida ? 'on' : ''}" aria-hidden="true">${icon('check', 24)}</span>
        </div>`
      : `<div class="serie-resumo">
          <div class="grow"><span class="caps k">${e.tipo === 'drop' ? `${e.partes.length} degraus` : `Carga fixa ${num1(e.carga)} kg`}</span>
          <div class="v" style="font-size:20px;line-height:26px">${esc(textoSerie(e, num))}</div></div>
          <span class="check ${e.concluida ? 'on' : ''}" aria-hidden="true">${icon('check', 24)}</span>
        </div>`;
  const abrir = e.concluida ? '' : `data-a="abrir-serie" data-i="${i}" role="button" tabindex="0"`;
  return `<div class="serie" ${abrir}>
    ${cabecalho(e, i, false)}
    ${corpo}
    ${linhaDescanso(e, i, ex, t)}
    ${e.concluida ? `<button class="link-btn" style="margin-top:4px" data-a="reabrir" data-i="${i}">${icon('rotate-ccw', 14)} Reabrir série</button>` : ''}
  </div>`;
}

function editor(ex, reg, i, passo, ult, t) {
  const e = reg.series[i];
  const ultTxt = ult ? `Última: ${esc(textoSerie(ult, num))}` : '';

  if (e.tipo === 'normal') {
    const p = e.partes[0];
    return `<div class="serie ativa">
      ${cabecalho(e, i, true)}
      <div class="row between mt12"><span class="caps mute">Carga de trabalho</span><span class="sm mute">${ultTxt}</span></div>
      <div class="mt8">${stepperGrande({ campo: 'carga', i, valor: p.carga, passo, un: 'kg', casas: 1 })}</div>
      <div class="row between mt12"><span class="caps mute">Repetições</span><span class="sm lime">Alvo: ${repsTxt(e)} reps</span></div>
      <div class="mt8">${stepperGrande({ campo: 'reps', i, valor: p.reps, passo: 1, un: 'reps', casas: 0 })}</div>
      <button class="btn mt16" data-a="salvar" data-i="${i}">${icon('circle-check', 20)} Salvar Série ${i + 1}</button>
    </div>`;
  }

  if (e.tipo === 'drop') {
    const partes = e.partes
      .map((p, k) => {
        const ant = e.partes[k - 1];
        const pct = ant && ant.carga > 0 ? Math.round((1 - p.carga / ant.carga) * 100) : 0;
        const rot = k === 0 ? 'Base' : `${k === e.partes.length - 1 ? 'Drop final' : 'Drop'} −${pct}%`;
        return `<div class="parte ${p.ok ? 'ok' : ''}">
          <div class="topo">
            <span class="caps ${k === 0 ? 'lime' : 'ok'}">Degrau ${k + 1} · ${rot}</span>
            <span class="row" style="gap:4px">
              ${k === e.partes.length - 1 && e.partes.length > 1 && !p.ok ? `<button class="icon-btn" style="width:40px;height:40px" data-a="rem-parte" data-i="${i}" aria-label="Remover degrau">${icon('x', 16)}</button>` : ''}
              <button class="check sm ${p.ok ? 'on' : ''}" data-a="ok-parte" data-i="${i}" data-p="${k}" aria-label="Confirmar degrau ${k + 1}" aria-pressed="${p.ok}">${icon('check', 22)}</button>
            </span>
          </div>
          <div class="grid2">
            <div><span class="caps">Carga (kg)</span>${stepperMini({ campo: 'carga', i, p: k, valor: p.carga, casas: 1 })}</div>
            <div><span class="caps">Reps</span>${stepperMini({ campo: 'reps', i, p: k, valor: p.reps, casas: 0 })}</div>
          </div>
        </div>`;
      })
      .join('');
    return `<div class="serie ativa">
      ${cabecalho(e, i, true)}
      <p class="sm mute" style="margin:6px 0 0">Reduza a carga logo após a falha em cada degrau. O descanso só começa ao final do bloco.</p>
      <div class="bloco">${partes}</div>
      <button class="link-btn" data-a="add-degrau" data-i="${i}">${icon('plus', 16)} Adicionar degrau (sugerir −20%)</button>
    </div>`;
  }

  // cluster
  const pausaAtiva = t && t.tipo === 'pausa' && !t.terminou;
  const blocos = e.partes
    .map((p, k) => {
      const mostraPausa = pausaAtiva && p.ok && k === e.partes.findLastIndex((x) => x.ok);
      return `<div class="parte ${p.ok ? 'ok' : ''}">
        <div class="topo">
          <span class="caps">Bloco ${k + 1}</span>
          <span class="row" style="gap:6px">
            ${mostraPausa ? `<span class="pausa-chip">${icon('timer', 14)} <span data-pausa-t>${mmss(timer.restanteSeg())}</span></span>` : ''}
            ${k === e.partes.length - 1 && e.partes.length > 1 && !p.ok ? `<button class="icon-btn" style="width:40px;height:40px" data-a="rem-parte" data-i="${i}" aria-label="Remover bloco">${icon('x', 16)}</button>` : ''}
            <button class="check sm ${p.ok ? 'on' : ''}" data-a="ok-parte" data-i="${i}" data-p="${k}" aria-label="Confirmar bloco ${k + 1}" aria-pressed="${p.ok}">${icon('check', 22)}</button>
          </span>
        </div>
        <div><span class="caps" style="display:block;margin-bottom:4px;color:var(--mute);font-size:10px">Reps</span>${stepperMini({ campo: 'reps', i, p: k, valor: p.reps, casas: 0 })}</div>
      </div>`;
    })
    .join('');
  return `<div class="serie ativa">
    ${cabecalho(e, i, true)}
    <p class="sm mute" style="margin:6px 0 0">Pausa curta de ${e.pausa}s entre os blocos. O descanso normal começa após o último.</p>
    <div class="row between mt12"><span class="caps mute">Carga fixa</span><span class="sm mute">${ultTxt}</span></div>
    <div class="mt8">${stepperGrande({ campo: 'cargaCluster', i, valor: e.carga, passo, un: 'kg', casas: 1 })}</div>
    <div class="bloco">${blocos}</div>
    <button class="link-btn" data-a="add-bloco" data-i="${i}">${icon('plus', 16)} Adicionar bloco</button>
  </div>`;
}

/* ---------- Tela ---------- */

export function exercicio({ id }) {
  const achado = acharExercicio(id);
  const voltar = `<a class="icon-btn" href="#/" aria-label="Voltar">${icon('arrow-left', 24)}</a>`;
  if (!achado) {
    return { top: `${voltar}<h1 class="sub">Exercício</h1>`, html: `<div class="vazio">${icon('x', 36)}<p>Exercício não encontrado.</p><a class="btn" href="#/">Voltar ao treino</a></div>`, nav: false };
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
  const aberta = escolhida != null && reg.series[escolhida] && !reg.series[escolhida].concluida ? escolhida : primeiraPend;

  const video = ex.video
    ? `<a class="chip" href="${esc(ex.video)}" target="_blank" rel="noopener">${icon('circle-play', 16)} Ver vídeo ${icon('external-link', 12)}</a>`
    : `<button class="chip" data-a="sem-video">${icon('circle-play', 16)} Ver vídeo</button>`;

  const ultima = ant
    ? `<section class="card ultima">
        <div class="row between"><span class="row" style="gap:6px"><span class="lime">${icon('history', 16)}</span><b>Última vez</b> <span class="mute">(${fmt(ant.sessao.inicio, { day: 'numeric', month: 'short' }).replace('.', '')})</span></span>
        <span class="caps ok">Vol. ${inteiro(ant.ex.series.reduce((s, e) => s + volumeSerie(e), 0))} kg</span></div>
        <div class="grid">${ant.ex.series
          .map((e, k) => {
            const hojeE = reg.series[k];
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
    ? `<a class="card row between" href="#/exercicio/${prox.id}" style="${todas ? 'border-color:var(--lime)' : ''}">
        <div><span class="caps mute">Próximo exercício</span><div class="h-md" style="margin-top:2px">${esc(prox.nome)}</div></div>
        <span class="icon-btn" style="background:var(--inset)">${icon('arrow-right', 20)}</span></a>`
    : `<a class="card row between" href="#/" style="${todas ? 'border-color:var(--lime)' : ''}">
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

/* ---------- Ações ---------- */

function descansar(i) {
  const { d, ex, reg, treino } = ctx();
  if (!d.config.autoDescanso) return;
  const prox = reg.series.findIndex((e) => !e.concluida);
  let proxima;
  if (prox >= 0) {
    proxima = { texto: `Série ${prox + 1} · ${textoSerie(reg.series[prox], num)}`, exId: ex.id };
  } else {
    const nx = treino.exercicios[treino.exercicios.findIndex((x) => x.id === ex.id) + 1];
    proxima = nx
      ? { texto: `Próximo exercício: ${nx.nome}`, exId: nx.id }
      : { texto: 'Treino completo! Finalize na tela inicial.', exId: null };
  }
  timer.iniciar({ seg: ex.descanso, tipo: 'descanso', ref: { exId: ex.id, idx: i }, proxima });
}

function concluir(i) {
  const { d } = ctx();
  const exId = ui.exAtual;
  commit(() => {
    atualizarConclusao(d.ativa, exId, i);
    propagarCarga(d.ativa.exercicios[exId], i);
  }, false);
  ui.aberta[exId] = undefined;
  ui.rolarAtiva = true;
  descansar(i);
  if (d.config.vibracao) timer.vibrar(30);
}

function redesenhar() {
  commit(() => {});
}

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
        if (campo === 'cargaCluster') e.carga = Math.max(0, Math.round(((e.carga || 0) + sentido * d.config.passo) * 100) / 100);
        else if (campo === 'carga') {
          const parte = e.partes[Number(p)];
          parte.carga = Math.max(0, Math.round(((parte.carga || 0) + sentido * d.config.passo) * 100) / 100);
        } else {
          const parte = e.partes[Number(p)];
          parte.reps = Math.max(0, (parte.reps || 0) + sentido);
        }
      });
    },
    salvar: (el) => {
      const i = Number(el.dataset.i);
      const { reg } = ctx();
      const e = reg.series[i];
      if (!(e.partes[0].reps > 0)) return toast('Informe as repetições');
      commit(() => {
        e.partes[0].ok = true;
      }, false);
      concluir(i);
      redesenhar();
    },
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
      else if (parte.ok && e.tipo === 'cluster') timer.iniciar({ seg: e.pausa, tipo: 'pausa' });
      redesenhar();
    },
    'add-degrau': (el) => {
      const e = ctx().reg.series[Number(el.dataset.i)];
      commit(() => adicionarDegrau(e));
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
      }, false);
      ui.aberta[ui.exAtual] = i;
      ui.rolarAtiva = true;
      redesenhar();
    },
    tec: (el) => {
      const i = Number(el.dataset.i);
      const e = ctx().reg.series[i];
      abrirSheet(`
        <h2 class="h-md">Técnica da série ${i + 1}</h2>
        <p class="mute" style="margin:6px 0 14px">Vale só para esta série, neste treino.</p>
        ${[
          ['normal', 'Normal', 'Uma série com carga e repetições fixas.'],
          ['drop', 'Drop set', 'Degraus de carga menor, sem descanso entre eles.'],
          ['cluster', 'Cluster', 'Mini-blocos com pausa curta entre eles.'],
        ]
          .map(([k, nome, desc]) => `<button class="op ${e.tipo === k ? 'on' : ''}" data-a="set-tec" data-i="${i}" data-tipo="${k}"><div class="grow"><b>${nome}</b><span>${desc}</span></div>${e.tipo === k ? icon('check', 20, 'lime') : ''}</button>`)
          .join('')}`);
    },
    'set-tec': (el) => {
      const i = Number(el.dataset.i);
      const { reg } = ctx();
      commit(() => {
        reg.series[i] = converterEntrada(reg.series[i], el.dataset.tipo);
      }, false);
      ui.aberta[ui.exAtual] = i;
      fecharSheet();
      redesenhar();
    },
    'add-serie': () => {
      abrirSheet(`
        <h2 class="h-md">Adicionar série</h2>
        <p class="mute" style="margin:6px 0 14px">Escolha a técnica da nova série.</p>
        ${[
          ['normal', 'Normal'],
          ['drop', 'Drop set'],
          ['cluster', 'Cluster'],
        ]
          .map(([k, nome]) => `<button class="op" data-a="nova-serie" data-tipo="${k}"><div class="grow"><b>${nome}</b></div>${icon('plus', 20)}</button>`)
          .join('')}`);
    },
    'nova-serie': (el) => {
      const { reg } = ctx();
      const ult = reg.series.at(-1);
      commit(() => {
        const p = novaSerie(el.dataset.tipo, ult?.repsMin ?? 10, ult?.repsMax ?? 12);
        reg.series.push(criarEntrada(p, ult ? { tipo: 'normal', partes: [{ carga: topoCarga(ult), reps: ult.partes[0]?.reps }] } : null, { extra: true }));
      }, false);
      ui.aberta[ui.exAtual] = reg.series.length - 1;
      ui.rolarAtiva = true;
      fecharSheet();
      redesenhar();
    },
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
  },
  {
    carga: (ds, valor) => {
      const e = ctx().reg.series[Number(ds.i)];
      commit(() => {
        e.auto = false;
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
    'nota-ex': (ds, valor) => {
      const { reg } = ctx();
      commit(() => {
        reg.nota = valor;
      }, false);
    },
  },
);
