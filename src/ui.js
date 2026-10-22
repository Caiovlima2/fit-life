import { esc } from './lib/util.js';

/** Estado só de interface (não é salvo). */
export const ui = {
  aberta: {}, // exId -> índice da série aberta
  editEx: null, // exercício aberto no editor
  rapida: '', // texto da "entrada rápida"
  progEx: null,
  periodo: '3m',
  mes: null, // { ano, mes }
  dia: null, // chave do dia selecionado no histórico
  rolarAtiva: false,
  instalar: null, // evento beforeinstallprompt
};

/** Registro de ações (cliques) e entradas (digitação) de todas as telas. */
export const acoes = {};
export const entradas = {};
export function registrar(a = {}, e = {}) {
  Object.assign(acoes, a);
  Object.assign(entradas, e);
}

const $ = (s) => document.querySelector(s);

let tToast;
export function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(tToast);
  tToast = setTimeout(() => el.classList.remove('on'), 2200);
}

export function abrirSheet(html) {
  const el = $('#sheet');
  el.innerHTML = `<div class="fundo" data-a="fechar"></div><div class="painel" role="dialog" aria-modal="true"><div class="alca"></div>${html}</div>`;
  el.classList.add('aberto');
}
export function fecharSheet() {
  const el = $('#sheet');
  el.classList.remove('aberto');
  el.innerHTML = '';
}

let pendente = null;
/** Pede confirmação antes de uma ação destrutiva. */
export function confirmar({ titulo, texto = '', ok = 'Confirmar', perigo = true, fn }) {
  pendente = fn;
  abrirSheet(`
    <h2 class="h-md">${esc(titulo)}</h2>
    ${texto ? `<p class="mute" style="margin:8px 0 16px">${esc(texto)}</p>` : '<div class="mt16"></div>'}
    <button class="btn ${perigo ? 'sec danger' : ''}" data-a="confirmado">${esc(ok)}</button>
    <button class="btn sec mt8" data-a="fechar">Cancelar</button>`);
}
registrar({
  fechar: () => fecharSheet(),
  confirmado: () => {
    const fn = pendente;
    pendente = null;
    fecharSheet();
    fn?.();
  },
});

export const ir = (hash) => {
  location.hash = hash;
};
