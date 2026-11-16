import { novaSerie } from './data.js';

/*
 * Entrada rápida de séries, usada no editor de treino.
 *   "4x8-10"                  4 séries normais de 8 a 10 reps
 *   "3x10-12 + drop"          + 1 série de drop set no final
 *   "3x8 + 2 cluster"         + 2 séries de cluster
 *   "3x10 + rest-pause"       + 1 série de rest-pause (também "rp")
 *   "3x45s"                   3 séries por tempo de 45 segundos
 */

const NOME_TECNICA = { drop: 'drop set', cluster: 'cluster', restpause: 'rest-pause' };

function tecnica(palavra) {
  if (palavra === 'drop' || palavra === 'cluster') return palavra;
  return 'restpause';
}

/** @returns {{ series: import('./tipos.js').SeriePlano[], texto: string } | null} */
export function parseRapida(txt) {
  const t = String(txt).trim().toLowerCase();

  const tempo = t.match(/^(\d+)\s*[x×]\s*(\d+)\s*(?:s|seg|segundos?)$/);
  if (tempo) {
    const n = Number(tempo[1]);
    const seg = Number(tempo[2]);
    if (n < 1 || n > 10 || seg < 5 || seg > 600) return null;
    return {
      series: Array.from({ length: n }, () => ({ ...novaSerie('tempo', 1, 1), segundos: seg })),
      texto: `${n} série${n > 1 ? 's' : ''} por tempo de ${seg} s`,
    };
  }

  const m = t.match(
    /^(\d+)\s*[x×]\s*(\d+)(?:\s*[-–a]\s*(\d+))?\s*(?:\+\s*(\d+)?\s*(drop|cluster|rest[\s-]?pause|rp)(?:\s*set)?s?)?$/,
  );
  if (!m) return null;
  const n = Number(m[1]);
  const min = Number(m[2]);
  const max = m[3] ? Number(m[3]) : min;
  const qtd = m[5] ? Number(m[4] ?? 1) : 0;
  if (n < 1 || n > 10 || min < 1 || max < min || max > 100 || qtd > 6) return null;
  const tipo = m[5] ? tecnica(m[5]) : null;
  const series = [
    ...Array.from({ length: n }, () => novaSerie('normal', min, max)),
    ...Array.from({ length: qtd }, () => novaSerie(tipo, min, max)),
  ];
  const faixa = min === max ? `${min}` : `${min}-${max}`;
  const texto = `${n} série${n > 1 ? 's' : ''} normai${n > 1 ? 's' : ''} (${faixa} reps)${qtd ? ` + ${qtd} série${qtd > 1 ? 's' : ''} de ${NOME_TECNICA[tipo]} no final` : ''}`;
  return { series, texto };
}
