import { inicioDaSemana } from './lib/util.js';

/**
 * Volume semanal por grupo muscular. Funções puras: recebem as sessões e uma função
 * `musculoDe(exId, nome)`, então não dependem do estado do app.
 */

/** @typedef {import('./tipos.js').Sessao} Sessao */

/** Início (domingo 00:00) da semana `deslocamento` semanas a partir da atual. */
export function inicioSemana(deslocamento = 0, agora = Date.now()) {
  const d = new Date(inicioDaSemana(agora));
  d.setDate(d.getDate() + 7 * deslocamento);
  return d.getTime();
}

const proxima = (ini) => {
  const d = new Date(ini);
  d.setDate(d.getDate() + 7);
  return d.getTime();
};

/** Séries de trabalho concluídas (aquecimento não conta; drop/cluster/rest-pause = 1 série). */
const contaveis = (reg) => reg.series.filter((e) => e.concluida && !e.aquecimento).length;

/**
 * @param {Sessao[]} sessoes
 * @param {number} ini início da semana
 * @param {(exId: string, nome: string) => string} musculoDe
 * @returns {{ total: number, grupos: Record<string, { series: number, exercicios: { id: string, nome: string, series: number, ts: number }[] }> }}
 */
export function volumeSemana(sessoes, ini, musculoDe) {
  const fim = proxima(ini);
  const grupos = {};
  let total = 0;
  for (const s of sessoes) {
    if (s.inicio < ini || s.inicio >= fim) continue;
    for (const [id, reg] of Object.entries(s.exercicios)) {
      const n = contaveis(reg);
      if (!n) continue;
      const g = musculoDe(id, reg.nome) || 'outro';
      const grupo = (grupos[g] ??= { series: 0, exercicios: [] });
      grupo.series += n;
      total += n;
      const ja = grupo.exercicios.find((x) => x.id === id && x.ts === s.inicio);
      if (ja) ja.series += n;
      else grupo.exercicios.push({ id, nome: reg.nome, series: n, ts: s.inicio });
    }
  }
  return { total, grupos };
}

/** Séries de um grupo nas últimas `n` semanas (a mais antiga primeiro, a atual por último). */
export function historicoGrupo(sessoes, grupo, n, musculoDe, agora = Date.now()) {
  return Array.from({ length: n }, (_, i) => {
    const ini = inicioSemana(i - (n - 1), agora);
    return { ini, series: volumeSemana(sessoes, ini, musculoDe).grupos[grupo]?.series ?? 0 };
  });
}

/** @returns {'abaixo' | 'faixa' | 'acima'} */
export function situacao(series, min, max) {
  return series < min ? 'abaixo' : series > max ? 'acima' : 'faixa';
}
