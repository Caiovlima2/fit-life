export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

const nf = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
const nf1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nfInt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });

/** 77.5 -> "77,5" · 80 -> "80" */
export const num = (n) => nf.format(Number.isFinite(n) ? n : 0);
/** 40 -> "40,0" */
export const num1 = (n) => nf1.format(Number.isFinite(n) ? n : 0);
export const inteiro = (n) => nfInt.format(Number.isFinite(n) ? n : 0);

/** segundos -> "01:30" */
export function mmss(s) {
  s = Math.max(0, Math.round(s));
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}
/** segundos -> "1:30" */
export function mss(s) {
  s = Math.max(0, Math.round(s));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}
/** ms -> "52m" ou "1h05" */
export function duracao(ms) {
  const min = Math.max(0, Math.round(ms / 60000));
  if (min < 60) return `${min}m`;
  return `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`;
}

/** Lê números digitados em pt-BR ("3,49" ou "3.49"). null se vazio/inválido. */
export function lerNumero(texto) {
  const limpo = String(texto ?? '').trim().replace(',', '.');
  if (limpo === '') return null;
  const n = Number(limpo);
  return Number.isFinite(n) ? n : null;
}

export const arredonda = (n, passo = 0.5) => Math.round(n / passo) * passo;
export const limitar = (n, min, max) => Math.min(max, Math.max(min, n));

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function chaveDia(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export const fmt = (ts, opts) => new Intl.DateTimeFormat('pt-BR', opts).format(new Date(ts));
export const dataCurta = (ts) => fmt(ts, { day: '2-digit', month: 'short' }).replace('.', '');
export const hora = (ts) => fmt(ts, { hour: '2-digit', minute: '2-digit' });

export function inicioDaSemana(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // domingo
  return d.getTime();
}
