import {
  topoCarga,
  textoSerie,
  repsTxt,
  rotuloSerie,
  emBlocos,
  TIPOS,
  REDUCOES_DROP,
  REDUCAO_DROP,
  DESCANSO_AQUECIMENTO,
} from '../data.js';
import { esc, num, num1, mss, mmss } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import * as timer from '../timer.js';

/*
 * Cartões de série da tela de exercício: peças, cartão compacto e um editor por técnica.
 * Só desenha HTML; as ações ficam em exercicio.js.
 */

/* ---------- Peças ---------- */

export function stepperGrande({ campo, i, p = 0, valor, passo, un, casas }) {
  const txt = casas === 1 ? num1(valor) : String(Math.round(valor || 0));
  const rotulo = { reps: 'Repetições', segundos: 'Segundos' }[campo] ?? 'Carga em kg';
  return `<div class="stepper">
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="-1" aria-label="Diminuir">−${num(passo)}</button>
    <div class="valor"><input class="num-input" inputmode="${casas === 1 ? 'decimal' : 'numeric'}" data-in="${campo}" data-i="${i}" data-p="${p}" data-fmt="${casas}" value="${txt}" aria-label="${rotulo}"><span class="un">${un}</span></div>
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="1" aria-label="Aumentar">+${num(passo)}</button>
  </div>`;
}

export function stepperMini({ campo, i, p = 0, valor, casas }) {
  const txt = casas === 1 ? num1(valor) : String(Math.round(valor || 0));
  return `<div class="stepper-mini">
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="-1" aria-label="Diminuir">−</button>
    <div class="valor"><input class="num-input" inputmode="${casas === 1 ? 'decimal' : 'numeric'}" data-in="${campo}" data-i="${i}" data-p="${p}" data-fmt="${casas}" value="${txt}" aria-label="${campo === 'reps' ? 'Repetições' : 'Carga em kg'}"></div>
    <button data-a="passo" data-campo="${campo}" data-i="${i}" data-p="${p}" data-d="1" aria-label="Aumentar">+</button>
  </div>`;
}

/** Seta de evolução em relação à última sessão. */
export function tendencia(hojeE, antes) {
  if (hojeE.tipo === 'tempo' || antes.tipo === 'tempo') {
    const ds = (hojeE.partes[0]?.segundos ?? 0) - (antes.partes[0]?.segundos ?? 0);
    if (ds > 0) return `<span class="trend up">↑ +${ds} s</span>`;
    if (ds < 0) return `<span class="trend dn">↓ ${ds} s</span>`;
    return `<span class="trend eq">=</span>`;
  }
  const dc = topoCarga(hojeE) - topoCarga(antes);
  if (Math.abs(dc) > 0.001)
    return dc > 0 ? `<span class="trend up">↑ +${num(dc)}</span>` : `<span class="trend dn">↓ ${num(dc)}</span>`;
  const dr = (hojeE.partes[0]?.reps ?? 0) - (antes.partes[0]?.reps ?? 0);
  if (dr > 0) return `<span class="trend up">↑ +${dr} rep</span>`;
  if (dr < 0) return `<span class="trend dn">↓ ${dr} rep</span>`;
  return `<span class="trend eq">=</span>`;
}

function metaSerie(e) {
  if (e.aquecimento) return 'Sem alvo';
  if (e.tipo === 'tempo') return `Meta: ${e.partes[0].segundos} s`;
  if (e.tipo === 'restpause') return 'Até a falha';
  if (e.tipo === 'cluster') return `Meta: ${e.partes.length} × ${repsTxt(e)} reps`;
  return `Meta: ${repsTxt(e)} reps`;
}

function cabecalho(reg, i, ativaAgora) {
  const e = reg.series[i];
  const nome = e.aquecimento ? 'Aquecimento' : TIPOS[e.tipo];
  const cls = e.aquecimento ? 'aq' : e.tipo;
  const chip = e.concluida
    ? `<span class="tec-chip ${cls}">${nome}</span>`
    : `<button class="tec-chip ${cls}" data-a="tec" data-i="${i}" aria-label="Mudar técnica de ${rotuloSerie(reg.series, i)}">${nome} ${icon('chevron-down', 12)}</button>`;
  return `<div class="serie-h">
    <span class="t">${rotuloSerie(reg.series, i)}</span>${chip}
    ${e.recorde ? `<span class="badge recorde">${icon('trophy', 12)} Recorde</span>` : ''}
    ${e.extra && !e.aquecimento ? '<span class="badge neutro">Extra</span>' : ''}
    <span class="grow"></span>
    ${ativaAgora ? `<span class="caps ${e.aquecimento ? 'az' : 'lime'}">Em andamento</span>` : `<span class="sm mute">${metaSerie(e)}</span>`}
  </div>`;
}

function linhaDescanso(e, i, ex, t) {
  if (!e.concluida) return '';
  const rpe = e.rpe ? `<span class="badge neutro">RPE ${e.rpe}</span>` : '';
  const meta = e.aquecimento ? DESCANSO_AQUECIMENTO : ex.descanso;
  const aqui = t && t.tipo === 'descanso' && t.ref && t.ref.exId === ex.id && t.ref.idx === i;
  if (aqui && !t.terminou) {
    return `<div class="descanso-real">${icon('timer', 14)} Descansando… <b class="num lime" data-timer-t>${mmss(timer.restanteSeg())}</b>${rpe}</div>`;
  }
  if (e.descansoReal != null) {
    return `<div class="descanso-real">${icon('circle-check', 14)} Concluído · descansou ${mss(e.descansoReal)} <span class="sub">(meta ${mss(meta)})</span>${rpe}</div>`;
  }
  return `<div class="descanso-real">${icon('circle-check', 14)} Concluído${rpe}</div>`;
}

/* ---------- Cartão compacto ---------- */

function corpoCompacto(e) {
  const check = `<span class="check ${e.concluida ? 'on' : ''}" aria-hidden="true">${icon('check', 24)}</span>`;
  if (e.tipo === 'normal') {
    return `<div class="serie-resumo">
      <div><span class="caps k">Carga</span><div class="v">${num1(e.partes[0].carga)}<small>kg</small></div></div>
      <div><span class="caps k">Reps</span><div class="v">${e.partes[0].reps}</div></div>
      <span class="grow"></span>${check}
    </div>`;
  }
  if (e.tipo === 'tempo') {
    const p = e.partes[0];
    return `<div class="serie-resumo">
      <div><span class="caps k">Tempo</span><div class="v">${p.segundos}<small>s</small></div></div>
      ${p.carga > 0 ? `<div><span class="caps k">Peso extra</span><div class="v">${num1(p.carga)}<small>kg</small></div></div>` : ''}
      <span class="grow"></span>${check}
    </div>`;
  }
  const rotulo = e.tipo === 'drop' ? `${e.partes.length} degraus` : `Carga fixa ${num1(e.carga)} kg`;
  return `<div class="serie-resumo">
    <div class="grow"><span class="caps k">${rotulo}</span>
    <div class="v" style="font-size:20px;line-height:26px">${esc(textoSerie(e, num))}</div></div>
    ${check}
  </div>`;
}

export function compacta(ex, reg, i, t) {
  const e = reg.series[i];
  const abrir = e.concluida ? '' : `data-a="abrir-serie" data-i="${i}" role="button" tabindex="0"`;
  return `<div class="serie ${e.aquecimento ? 'aq' : ''}" ${abrir}>
    ${cabecalho(reg, i, false)}
    ${corpoCompacto(e)}
    ${linhaDescanso(e, i, ex, t)}
    ${e.concluida ? `<button class="link-btn" style="margin-top:4px" data-a="reabrir" data-i="${i}">${icon('rotate-ccw', 14)} Reabrir série</button>` : ''}
  </div>`;
}

/* ---------- Editores (um por técnica) ---------- */

function editorNormal(reg, i, passo, ultTxt) {
  const e = reg.series[i];
  const p = e.partes[0];
  const aq = e.aquecimento;
  return `<div class="serie ativa ${aq ? 'aq' : ''}">
    ${cabecalho(reg, i, true)}
    <div class="row between mt12"><span class="caps mute">${aq ? 'Carga' : 'Carga de trabalho'}</span><span class="sm mute">${ultTxt}</span></div>
    <div class="mt8">${stepperGrande({ campo: 'carga', i, valor: p.carga, passo, un: 'kg', casas: 1 })}</div>
    <div class="row between mt12"><span class="caps mute">Repetições</span>${aq ? '<span class="sm az">Sem alvo, o que sentir</span>' : `<span class="sm lime">Alvo: ${repsTxt(e)} reps</span>`}</div>
    <div class="mt8">${stepperGrande({ campo: 'reps', i, valor: p.reps, passo: 1, un: 'reps', casas: 0 })}</div>
    <button class="btn ${aq ? 'aq' : ''} mt16" data-a="salvar" data-i="${i}">${icon('circle-check', 20)} ${aq ? 'Salvar aquecimento' : `Salvar ${rotuloSerie(reg.series, i)}`}</button>
  </div>`;
}

function editorDrop(reg, i) {
  const e = reg.series[i];
  const reducao = e.reducao ?? REDUCAO_DROP;
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
  const opcoes = REDUCOES_DROP.map(
    (r) =>
      `<button class="${Math.abs(r - reducao) < 0.001 ? 'on' : ''}" data-a="set-reducao" data-i="${i}" data-v="${r}" aria-pressed="${Math.abs(r - reducao) < 0.001}">${Math.round(r * 100)}%</button>`,
  ).join('');
  return `<div class="serie ativa">
    ${cabecalho(reg, i, true)}
    <p class="sm mute" style="margin:6px 0 0">Reduza a carga logo após a falha em cada degrau. O descanso só começa ao final do bloco.</p>
    <div class="row between mt12"><span class="caps mute">Redução por degrau</span><span class="sm mute">Recalcula os degraus</span></div>
    <div class="seg mt8" role="group" aria-label="Redução por degrau">${opcoes}</div>
    <div class="bloco">${partes}</div>
    <button class="link-btn" data-a="add-degrau" data-i="${i}">${icon('plus', 16)} Adicionar degrau (−${Math.round(reducao * 100)}%)</button>
  </div>`;
}

/** Cluster e rest-pause: carga fixa, vários blocos e pausa curta entre eles. */
function editorBlocos(reg, i, passo, ultTxt, t) {
  const e = reg.series[i];
  const rp = e.tipo === 'restpause';
  const pausaAtiva = t && t.tipo === 'pausa' && !t.terminou;
  const blocos = e.partes
    .map((p, k) => {
      const mostraPausa = pausaAtiva && p.ok && k === e.partes.findLastIndex((x) => x.ok);
      return `<div class="parte ${p.ok ? 'ok' : ''}">
        <div class="topo">
          <span><span class="caps">Bloco ${k + 1}</span>${rp ? '<span class="sm mute" style="display:block">até a falha</span>' : ''}</span>
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
  const texto = rp
    ? `Vá até a falha, descanse ${e.pausa} s e continue com a mesma carga. O descanso normal só começa depois do último bloco.`
    : `Pausa curta de ${e.pausa}s entre os blocos. O descanso normal começa após o último.`;
  return `<div class="serie ativa">
    ${cabecalho(reg, i, true)}
    <p class="sm mute" style="margin:6px 0 0">${texto}</p>
    <div class="row between mt12"><span class="caps mute">Carga fixa</span><span class="sm mute">${ultTxt}</span></div>
    <div class="mt8">${stepperGrande({ campo: 'cargaCluster', i, valor: e.carga, passo, un: 'kg', casas: 1 })}</div>
    <div class="bloco">${blocos}</div>
    <button class="link-btn" data-a="add-bloco" data-i="${i}">${icon('plus', 16)} Adicionar bloco</button>
  </div>`;
}

function editorTempo(ex, reg, i, passo, t) {
  const e = reg.series[i];
  const p = e.partes[0];
  const rodando = !!t && t.tipo === 'tempo' && t.ref?.exId === ex.id && t.ref.idx === i;
  const pausado = rodando && timer.emPausa();
  const frac = rodando ? Math.min(1, Math.max(0, timer.restanteMs() / (t.total * 1000))) : 0;
  const cron = rodando
    ? `<div class="cron">
        <span class="caps mute">${t.terminou ? 'Tempo!' : pausado ? 'Pausado' : 'Segurando'}</span>
        <div class="grande ${t.terminou ? 'fim' : ''}" role="timer" data-timer-t>${mmss(timer.restanteSeg())}</div>
        <div class="bar"><i data-timer-p style="width:${(frac * 100).toFixed(1)}%"></i></div>
        <span class="sm mute">Meta ${t.total} s</span>
      </div>`
    : `<div class="cron">
        <span class="caps mute">Cronômetro</span>
        <div class="grande">${mmss(p.segundos)}</div>
        <button class="btn sec" data-a="tempo-iniciar" data-i="${i}">${icon('play', 18)} Iniciar cronômetro</button>
      </div>`;
  const botoes = rodando
    ? `<div class="row mt16" style="gap:8px">
        <button class="btn sec grow" data-a="tempo-pausar" data-i="${i}">${icon(pausado ? 'play' : 'pause', 18)} ${pausado ? 'Retomar' : 'Pausar'}</button>
        <button class="btn grow" data-a="tempo-concluir" data-i="${i}">${icon('circle-check', 18)} Concluir série</button>
      </div>`
    : `<button class="btn mt16" data-a="salvar" data-i="${i}">${icon('circle-check', 20)} Salvar ${rotuloSerie(reg.series, i)} sem cronômetro</button>`;
  return `<div class="serie ativa">
    ${cabecalho(reg, i, true)}
    ${cron}
    <div class="row between mt12"><span class="caps mute">Tempo da série</span><span class="sm mute">Ajuste de 5 em 5 s</span></div>
    <div class="mt8">${stepperGrande({ campo: 'segundos', i, valor: p.segundos, passo: 5, un: 's', casas: 0 })}</div>
    <div class="row between mt12"><span class="caps mute">Peso extra</span><span class="sm mute">Opcional</span></div>
    <div class="mt8">${stepperGrande({ campo: 'carga', i, valor: p.carga, passo, un: 'kg', casas: 1 })}</div>
    ${botoes}
  </div>`;
}

export function editor(ex, reg, i, passo, ult, t) {
  const e = reg.series[i];
  const ultTxt = ult ? `Última: ${esc(textoSerie(ult, num))}` : '';
  if (e.tipo === 'tempo') return editorTempo(ex, reg, i, passo, t);
  if (e.tipo === 'drop') return editorDrop(reg, i);
  if (emBlocos(e.tipo)) return editorBlocos(reg, i, passo, ultTxt, t);
  return editorNormal(reg, i, passo, ultTxt);
}
