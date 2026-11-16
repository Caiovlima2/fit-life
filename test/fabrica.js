import { substituirTudo, novaSerie } from '../src/data.js';

/** Carrega um banco limpo (sem o treino de exemplo). */
export function banco(parcial = {}) {
  substituirTudo({ treinos: [{ id: 't1', nome: 'T', foco: '', exercicios: [] }], sessoes: [], ...parcial });
}

export const plano = (tipo = 'normal', repsMin = 8, repsMax = 10) => novaSerie(tipo, repsMin, repsMax);

/** Série realizada concluída. */
export function feita(tipo, partes, extra = {}) {
  return { tipo, repsMin: 8, repsMax: 10, partes, concluida: true, auto: false, ...extra };
}
export const normal = (carga, reps = 8) => feita('normal', [{ carga, reps, ok: true }]);
export const drop = (...cargas) =>
  feita(
    'drop',
    cargas.map((carga) => ({ carga, reps: 8, ok: true })),
  );
export const cluster = (carga, ...reps) =>
  feita(
    'cluster',
    reps.map((r) => ({ reps: r, ok: true })),
    { carga },
  );

export function sessao(id, inicio, exercicios) {
  return { id, treinoId: 't1', nome: 'T', inicio, fim: inicio + 3600000, exercicios };
}
export const reg = (...series) => ({ nome: 'Supino', nota: '', series });
