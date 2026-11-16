import { topoCarga, rm1 } from './data.js';

/** @typedef {import('./tipos.js').Sessao} Sessao */

const DIA = 86400000;

/** Só séries normais e drop (1º degrau) entram: cluster/rest-pause/tempo não comparam por carga e reps. */
const elegivel = (e) => e.concluida && !e.aquecimento && (e.tipo === 'normal' || e.tipo === 'drop');

/**
 * Recordes por exercício. O recorde é a série com maior 1RM estimado; ele é "batido" quando a
 * melhor série de uma sessão supera tudo que veio antes (a 1ª sessão só estabelece a marca).
 * @param {Sessao[]} sessoes
 * @param {number} [agora]
 */
export function recordes(sessoes, agora = Date.now()) {
  const ordenadas = [...sessoes].sort((a, b) => a.inicio - b.inicio);
  /** @type {Map<string, any>} */
  const porEx = new Map();
  let batidos30 = 0;

  for (const s of ordenadas) {
    for (const [id, reg] of Object.entries(s.exercicios)) {
      let melhor = null;
      for (const e of reg.series.filter(elegivel)) {
        const carga = topoCarga(e);
        const reps = e.partes[0].reps;
        if (!(carga > 0) || !(reps > 0)) continue;
        const est = rm1(carga, reps);
        if (!melhor || est > melhor.est) melhor = { carga, reps, est };
      }
      if (!melhor) continue;
      const atual = porEx.get(id);
      if (!atual) {
        porEx.set(id, { id, nome: reg.nome, ...melhor, ts: s.inicio, anterior: null, batido: false });
      } else if (melhor.est > atual.est) {
        if (agora - s.inicio <= 30 * DIA) batidos30++;
        porEx.set(id, {
          id,
          nome: reg.nome,
          ...melhor,
          ts: s.inicio,
          anterior: { carga: atual.carga, reps: atual.reps },
          batido: true,
        });
      }
    }
  }

  const itens = [...porEx.values()]
    .map((r) => ({
      ...r,
      delta: r.anterior ? Math.round((r.carga - r.anterior.carga) * 10) / 10 : null,
      novo: r.batido && agora - r.ts <= 7 * DIA,
    }))
    .sort((a, b) => b.ts - a.ts);
  const recente = itens.find((r) => r.batido) ?? null;
  return { itens, batidos30, recente };
}
