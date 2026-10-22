import { get, commit } from './data.js';

/*
 * TIMER DE DESCANSO
 * Guarda o HORÁRIO DE TÉRMINO (não um contador), então continua certo se a tela
 * apagar, o app for pausado ou a página recarregar.
 *
 * db.timer = { inicio, fim | null, restante | null (pausado), total, tipo: 'descanso' | 'pausa',
 *              ref: { exId, idx } | null, proxima: { texto, exId } | null, terminou }
 */

export const ouvintes = { mudou: () => {}, tick: () => {} };

export const ativo = () => get().timer;

export function restanteMs() {
  const t = get().timer;
  if (!t) return 0;
  if (t.fim == null) return t.restante ?? 0;
  return Math.max(0, t.fim - Date.now());
}
export const restanteSeg = () => Math.ceil(restanteMs() / 1000);
export const emPausa = () => !!get().timer && get().timer.fim == null;

export function iniciar({ seg, tipo = 'descanso', ref = null, proxima = null }) {
  finalizarDescanso();
  const agora = Date.now();
  commit((d) => {
    d.timer = { inicio: agora, fim: agora + seg * 1000, restante: null, total: seg, tipo, ref, proxima, terminou: false };
  }, false);
  ouvintes.mudou();
}

/** Registra quanto tempo o descanso REAL durou na série que o originou. */
export function finalizarDescanso() {
  const d = get();
  const t = d.timer;
  if (!t || t.tipo !== 'descanso' || !t.ref || !d.ativa) return;
  const e = d.ativa.exercicios[t.ref.exId]?.series[t.ref.idx];
  if (!e) return;
  const real = Math.round((Date.now() - t.inicio) / 1000);
  commit(() => {
    e.descansoReal = Math.min(real, 3600);
  }, false);
}

export function dispensar() {
  finalizarDescanso();
  commit((d) => {
    d.timer = null;
  }, false);
  ouvintes.mudou();
}

export function somar(seg) {
  const t = get().timer;
  if (!t) return;
  commit(() => {
    if (t.fim == null) t.restante = Math.max(0, (t.restante ?? 0) + seg * 1000);
    else t.fim += seg * 1000;
    t.total = Math.max(t.total, Math.ceil(restanteMs() / 1000));
    t.terminou = restanteMs() <= 0;
  }, false);
  ouvintes.mudou();
}

export function pausar() {
  const t = get().timer;
  if (!t || t.fim == null) return;
  commit(() => {
    t.restante = Math.max(0, t.fim - Date.now());
    t.fim = null;
  }, false);
  ouvintes.mudou();
}

export function retomar() {
  const t = get().timer;
  if (!t || t.fim != null) return;
  commit(() => {
    t.fim = Date.now() + (t.restante ?? 0);
    t.restante = null;
  }, false);
  ouvintes.mudou();
}

/** Define o alvo total do descanso atual (ex.: preset de 1:30). */
export function definirAlvo(seg) {
  const t = get().timer;
  if (!t) return;
  commit(() => {
    t.total = seg;
    t.fim = t.inicio + seg * 1000;
    t.restante = null;
    t.terminou = t.fim <= Date.now();
  }, false);
  ouvintes.mudou();
}

/* ---------- Alerta ---------- */

let audioCtx = null;
export function destravarAudio() {
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch {
    /* sem áudio */
  }
}

export function bipar(vezes = 3) {
  try {
    destravarAudio();
    if (!audioCtx) return;
    for (let i = 0; i < vezes; i++) {
      const osc = audioCtx.createOscillator();
      const ganho = audioCtx.createGain();
      const t0 = audioCtx.currentTime + i * 0.28;
      osc.type = 'square';
      osc.frequency.value = i === vezes - 1 ? 1320 : 880;
      ganho.gain.setValueAtTime(0.0001, t0);
      ganho.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
      ganho.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
      osc.connect(ganho).connect(audioCtx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.22);
    }
  } catch {
    /* ignora */
  }
}

export function vibrar(padrao = 15) {
  try {
    navigator.vibrate?.(padrao);
  } catch {
    /* sem suporte */
  }
}

export function alertar(t) {
  const { som, vibracao } = get().config;
  const curto = t.tipo === 'pausa';
  if (som) bipar(curto ? 2 : 3);
  if (vibracao) vibrar(curto ? [150, 80, 150] : [250, 100, 250, 100, 500]);
}

/** Chamado a cada 250 ms. */
export function tick() {
  const t = get().timer;
  if (!t) return;
  if (t.fim != null && !t.terminou && Date.now() >= t.fim) {
    commit(() => {
      t.terminou = true;
    }, false);
    alertar(t);
    ouvintes.mudou();
    return;
  }
  ouvintes.tick();
}

export function iniciarRelogio() {
  setInterval(tick, 250);
  // Ao voltar para o app, confere na hora (a tela pode ter ficado apagada).
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tick();
  });
}

/* ---------- Tela sempre ligada ---------- */

let sentinela = null;
export async function manterTelaLigada(ligar) {
  if (!('wakeLock' in navigator)) return;
  try {
    if (ligar && !sentinela) {
      sentinela = await navigator.wakeLock.request('screen');
      sentinela.addEventListener('release', () => {
        sentinela = null;
      });
    } else if (!ligar && sentinela) {
      await sentinela.release();
      sentinela = null;
    }
  } catch {
    /* o navegador pode negar (economia de bateria, aba em segundo plano) */
  }
}
