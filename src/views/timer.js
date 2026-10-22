import { get, commit, acharExercicio, PRESETS_DESCANSO } from '../data.js';
import { esc, mmss, mss } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ir } from '../ui.js';
import * as timer from '../timer.js';

const R = 118;
const C = 2 * Math.PI * R;

const fracao = () => {
  const t = get().timer;
  if (!t) return 0;
  return Math.min(1, Math.max(0, timer.restanteMs() / (t.total * 1000)));
};

/** Barra flutuante (recolhida) — aparece acima da navegação em qualquer tela. */
export function barraTimer() {
  const t = get().timer;
  if (!t) return '';
  const pausa = t.tipo === 'pausa';
  const rotulo = t.terminou ? 'Bora!' : timer.emPausa() ? 'Pausado' : pausa ? 'Pausa entre blocos' : 'Descanso';
  const sub = t.terminou && t.proxima ? t.proxima.texto : '';
  const f = fracao();
  return `<div class="timer-bar ${t.terminou ? 'fim' : ''}" role="timer" aria-label="Timer de descanso">
    <button class="esq" data-a="abrir-timer" aria-label="Abrir timer">
      <span class="dot"></span>
      <span style="min-width:0"><span class="caps rot" style="display:block">${rotulo}</span>
      ${t.terminou ? `<b class="disp" style="font-size:16px;line-height:20px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(sub || 'Próxima série')}</b>` : `<span class="tempo" data-timer-t>${mmss(timer.restanteSeg())}</span>`}</span>
    </button>
    ${
      t.terminou
        ? `<button class="bt" data-a="timer-ok">OK</button>`
        : `<button class="bt" data-a="timer-add" data-s="-15" aria-label="Menos 15 segundos">−15s</button>
           <button class="bt" data-a="timer-add" data-s="15" aria-label="Mais 15 segundos">+15s</button>
           <button class="bt lime" data-a="timer-skip">Pular</button>`
    }
    <div class="prog"><i data-timer-p style="width:${(f * 100).toFixed(1)}%"></i></div>
  </div>`;
}

export function timerView() {
  const d = get();
  const t = d.timer;
  const voltar = `<button class="icon-btn" data-a="minimizar" aria-label="Minimizar">${icon('chevron-left', 24)}</button>`;
  if (!t) {
    return { top: `${voltar}<h1 class="sub">Timer</h1>`, html: `<div class="vazio">${icon('timer', 40)}<p>Nenhum descanso em andamento.</p><a class="btn" href="#/">Voltar ao treino</a></div>`, nav: false, semDock: true };
  }
  const ref = t.ref ? acharExercicio(t.ref.exId) : null;
  const prox = t.proxima?.exId ? acharExercicio(t.proxima.exId) : null;
  const pausado = timer.emPausa();
  const rotulo = t.tipo === 'pausa' ? 'Pausa entre blocos' : `Descanso${ref ? ` · Série ${t.ref.idx + 1} concluída` : ''}`;
  const dashoffset = C * (1 - fracao());

  const presets =
    t.tipo === 'descanso'
      ? `<div class="mt16"><div class="row between"><span class="caps mute">Ajuste de intervalo alvo</span><span class="caps lime">Salva no exercício</span></div>
          <div class="periodos" style="margin-top:8px">${PRESETS_DESCANSO.map((s) => `<button class="chip big ${t.total === s ? 'on' : ''}" data-a="timer-preset" data-v="${s}">${t.total === s ? '✓ ' : ''}${mss(s)}</button>`).join('')}</div></div>`
      : '';

  const proximo = t.proxima
    ? `<section class="card">
        <span class="badge lime">A seguir</span>
        <div class="h-md mt8">${esc(t.proxima.texto)}</div>
        ${prox?.ex ? `<p class="mute" style="margin:6px 0 0">${esc(prox.ex.nome)}</p>${prox.ex.nota ? `<div class="nota">${icon('lightbulb', 16)}<span>${esc(prox.ex.nota)}</span></div>` : ''}` : ''}
        ${prox ? `<a class="btn sec sm mt12" href="#/exercicio/${prox.ex.id}">Abrir exercício ${icon('arrow-right', 16)}</a>` : ''}
      </section>`
    : '';

  const fim = t.terminou
    ? `<div class="fim-box"><span class="caps">Alerta de conclusão</span><div class="t">FIM DO DESCANSO!</div>
        <div>${esc(t.proxima?.texto ?? 'Hora da próxima série.')}</div>
        <button class="btn" data-a="timer-comecar" data-ex="${t.proxima?.exId ?? ''}">Começar</button></div>`
    : '';

  const html = `
    ${fim}
    <section class="card" style="margin-top:8px">
      <span class="caps lime">● ${esc(rotulo)}</span>
      <div class="anel-wrap">
        <svg viewBox="0 0 280 280" aria-hidden="true">
          <circle cx="140" cy="140" r="${R}" fill="none" stroke="#1c212d" stroke-width="14"/>
          <circle data-timer-ring cx="140" cy="140" r="${R}" fill="none" stroke="#d4ff00" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${dashoffset.toFixed(2)}"/>
        </svg>
        <div class="centro"><span class="grande" data-timer-t>${mmss(timer.restanteSeg())}</span><span class="caps mute" style="margin-top:6px">${icon('timer', 12)} Alvo: ${mmss(t.total)}</span></div>
      </div>
      <div class="ctrl3">
        <button data-a="timer-add" data-s="-15">${icon('rotate-ccw', 18)} −15s</button>
        <button data-a="timer-pausar" aria-label="${pausado ? 'Retomar' : 'Pausar'}">${icon(pausado ? 'play' : 'pause', 22)}</button>
        <button data-a="timer-add" data-s="15">${icon('rotate-cw', 18)} +15s</button>
      </div>
      <button class="btn sec mt12" data-a="timer-skip">${icon('skip-forward', 18)} Pular descanso</button>
      ${presets}
    </section>
    ${proximo}
  `;
  return { top: `${voltar}<h1 class="sub">Treino</h1><span class="tag-ativo">Ativo</span>`, html, nav: false, semDock: true };
}

/** Atualiza só os números (sem redesenhar) a cada tick. */
export function atualizarTick() {
  const t = get().timer;
  if (!t) return;
  const seg = mmss(timer.restanteSeg());
  document.querySelectorAll('[data-timer-t],[data-pausa-t]').forEach((el) => {
    if (el.textContent !== seg) el.textContent = seg;
  });
  const f = fracao();
  document.querySelectorAll('[data-timer-p]').forEach((el) => (el.style.width = `${(f * 100).toFixed(1)}%`));
  const anel = document.querySelector('[data-timer-ring]');
  if (anel) anel.setAttribute('stroke-dashoffset', (C * (1 - f)).toFixed(2));
}

registrar({
  'abrir-timer': () => ir('#/timer'),
  minimizar: () => (history.length > 1 ? history.back() : ir('#/')),
  'timer-add': (el) => {
    timer.somar(Number(el.dataset.s));
    redesenharTimer();
  },
  'timer-pausar': () => {
    if (timer.emPausa()) timer.retomar();
    else timer.pausar();
    redesenharTimer();
  },
  'timer-skip': () => {
    const exId = get().timer?.proxima?.exId;
    timer.dispensar();
    if (location.hash === '#/timer') ir(exId ? `#/exercicio/${exId}` : '#/');
    else redesenharTimer();
  },
  'timer-ok': () => {
    timer.dispensar();
    redesenharTimer();
  },
  'timer-comecar': (el) => {
    timer.dispensar();
    ir(el.dataset.ex ? `#/exercicio/${el.dataset.ex}` : '#/');
  },
  'timer-preset': (el) => {
    const v = Number(el.dataset.v);
    const t = get().timer;
    timer.definirAlvo(v);
    const alvo = t?.ref ? acharExercicio(t.ref.exId) : null;
    if (alvo) commit(() => (alvo.ex.descanso = v), false);
    redesenharTimer();
  },
});

function redesenharTimer() {
  commit(() => {});
}
