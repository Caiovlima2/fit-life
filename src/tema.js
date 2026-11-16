export const TEMAS = [
  ['escuro', 'Escuro'],
  ['claro', 'Claro'],
  ['auto', 'Automático'],
];

const COR_BARRA = { escuro: '#0C0E12', claro: '#F3F5F9' };

/** Tema efetivo: 'auto' segue o aparelho. @param {string} tema @param {boolean} sistemaClaro */
export const resolverTema = (tema, sistemaClaro) =>
  tema === 'claro' || (tema === 'auto' && sistemaClaro) ? 'claro' : 'escuro';

/** Aplica o tema na página e na cor da barra do navegador. */
export function aplicarTema(tema) {
  const claro = window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false;
  const efetivo = resolverTema(tema, claro);
  document.documentElement.dataset.tema = efetivo;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COR_BARRA[efetivo]);
}
