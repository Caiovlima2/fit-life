import { uid, arredonda, chaveDia } from './lib/util.js';
import { sugerirMusculo } from './musculos.js';

/** @typedef {import('./tipos.js').Dados} Dados */
/** @typedef {import('./tipos.js').Treino} Treino */
/** @typedef {import('./tipos.js').ExercicioPlano} ExercicioPlano */
/** @typedef {import('./tipos.js').SeriePlano} SeriePlano */
/** @typedef {import('./tipos.js').SerieFeita} SerieFeita */
/** @typedef {import('./tipos.js').Sessao} Sessao */
/** @typedef {import('./tipos.js').TipoSerie} TipoSerie */

/*
 * MODELO DE DADOS
 *
 * treinos[]            O plano (prescrição)
 *   exercicios[]
 *     series[]         Uma prescrição por série: { tipo, repsMin, repsMax, degraus, blocos, pausa }
 *                      tipo = 'normal' | 'drop' | 'cluster'  (a técnica é da SÉRIE, não do exercício)
 *
 * sessoes[]            O realizado (um treino feito em uma data)
 *   exercicios{ [exId] }
 *     series[]         { tipo, partes[{carga, reps, ok}], carga (cluster), concluida, descansoReal, recorde }
 *                      normal  = 1 parte · drop = N degraus · cluster = N mini-blocos (mesma carga)
 *
 * ativa                Sessão em andamento (mesma estrutura, com fim = null)
 * timer                Timer de descanso global (guarda o horário de término, não um contador)
 */

/** Chave do localStorage. Única fonte desta string no app. */
export const CHAVE = 'fitlife:v1';
export const TIPOS = {
  normal: 'Normal',
  drop: 'Drop set',
  cluster: 'Cluster',
  restpause: 'Rest-pause',
  tempo: 'Por tempo',
};
export const INTENSIDADES = { leve: 'Leve', moderada: 'Moderada', pesada: 'Pesada' };
export const PRESETS_DESCANSO = [45, 60, 90, 120, 180];
export const REDUCAO_DROP = 0.2;
export const REDUCOES_DROP = [0.2, 0.3, 0.4];
export const DESCANSO_AQUECIMENTO = 30;
/** Com esforço igual ou acima disto, o app não sugere aumentar a carga. */
export const RPE_SEGURA_SUGESTAO = 9;
const FRACOES_AQUECIMENTO = [0.5, 0.75, 0.9];
const REPS_AQUECIMENTO = [12, 6, 3];

/** Técnicas com carga única e vários mini-blocos de repetições. */
export const emBlocos = (tipo) => tipo === 'cluster' || tipo === 'restpause';

/** @type {Dados} */
let db;
let aoMudar = () => {};

export const get = () => db;
export const onChange = (fn) => (aoMudar = fn);

function persistir() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(db));
  } catch (e) {
    console.warn('Não foi possível salvar', e);
  }
}

/** Altera os dados, salva e (por padrão) redesenha a tela. */
export function commit(fn, redesenhar = true) {
  fn(db);
  persistir();
  if (redesenhar) aoMudar();
}

export function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) {
      db = migrar(JSON.parse(bruto));
      return db;
    }
  } catch (e) {
    console.warn('Dados ilegíveis, começando do zero', e);
  }
  db = padrao();
  persistir();
  return db;
}

/** Completa dados antigos com os campos novos (nunca apaga nada). @param {any} d @returns {Dados} */
export function migrar(d) {
  const base = padrao();
  d.config = { ...base.config, ...(d.config || {}) };
  d.treinos = Array.isArray(d.treinos) ? d.treinos : base.treinos;
  d.sessoes = Array.isArray(d.sessoes) ? d.sessoes : [];
  d.ativa ??= null;
  d.timer ??= null;
  d.ultimoBackup ??= null;
  for (const t of d.treinos) {
    for (const ex of t.exercicios ?? []) ex.musculo ??= sugerirMusculo(ex.nome);
  }
  if (!d.treinos.find((t) => t.id === d.treinoAtual)) d.treinoAtual = d.treinos[0]?.id ?? null;
  return d;
}

export function substituirTudo(novo) {
  db = migrar(novo);
  persistir();
  aoMudar();
}

function padrao() {
  const treinos = [treinoExemplo()];
  return {
    v: 1,
    treinos,
    treinoAtual: treinos[0].id,
    sessoes: [],
    ativa: null,
    timer: null,
    ultimoBackup: null,
    config: {
      som: true,
      vibracao: true,
      telaLigada: true,
      autoDescanso: true,
      rpe: true,
      sugestaoCarga: true,
      passo: 2.5,
      metaSemanal: 4,
      volMin: 10,
      volMax: 20,
      tema: /** @type {'escuro'} */ ('escuro'),
      notificacao: false,
    },
  };
}

/* ---------- Prescrição ---------- */

/** @param {TipoSerie} [tipo] @returns {SeriePlano} */
export function novaSerie(tipo = 'normal', repsMin = 10, repsMax = 12) {
  return {
    tipo,
    repsMin,
    repsMax,
    degraus: 3,
    blocos: tipo === 'restpause' ? 3 : 4,
    pausa: 15,
    reducao: REDUCAO_DROP,
    segundos: 45,
  };
}

/** @returns {ExercicioPlano} */
export function novoExercicio(nome = 'Novo exercício') {
  return {
    id: uid(),
    nome,
    grupo: '',
    musculo: '',
    intensidade: 'moderada',
    descanso: 90,
    video: '',
    nota: '',
    series: [novaSerie(), novaSerie(), novaSerie()],
  };
}

/** @returns {Treino} */
export function novoTreino(nome = 'Novo treino') {
  return { id: uid(), nome, foco: '', exercicios: [] };
}

function treinoExemplo() {
  const ex = (nome, grupo, intensidade, descanso, series, nota = '') => ({
    id: uid(),
    nome,
    grupo,
    musculo: sugerirMusculo(nome),
    intensidade,
    descanso,
    video: '',
    nota,
    series,
  });
  const n = (qtd, a, b) => Array.from({ length: qtd }, () => novaSerie('normal', a, b));
  return {
    id: uid(),
    nome: 'Treino A – Peito e Tríceps',
    foco: 'Exemplo — edite ou apague à vontade',
    exercicios: [
      ex(
        'Supino Reto com Barra',
        'Peitoral maior · Composto',
        'pesada',
        120,
        n(4, 8, 10),
        'Escápulas travadas no banco. Não estalar os cotovelos no topo.',
      ),
      ex('Supino Inclinado com Halteres', 'Peitoral superior', 'moderada', 90, n(3, 10, 12)),
      ex(
        'Crossover na Polia Média',
        'Peitoral maior · Isolador',
        'pesada',
        90,
        [...n(3, 10, 12), novaSerie('drop', 10, 12)],
        'Segurar 1s no pico de contração antes de iniciar o drop.',
      ),
      ex('Desenvolvimento Militar', 'Ombros', 'pesada', 150, n(4, 6, 8)),
      ex(
        'Paralelas (Dips) com Carga',
        'Peitoral inferior · Tríceps',
        'pesada',
        120,
        Array.from({ length: 3 }, () => ({ ...novaSerie('cluster', 3, 3), blocos: 4, pausa: 15 })),
        'Foco no peitoral, tronco inclinado 30° à frente.',
      ),
      ex('Tríceps Testa na Barra', 'Tríceps', 'moderada', 75, n(3, 10, 12)),
      ex('Tríceps Corda na Polia', 'Tríceps', 'leve', 60, [...n(3, 12, 15), novaSerie('drop', 12, 15)]),
    ],
  };
}

export const treinoAtual = () => db.treinos.find((t) => t.id === db.treinoAtual) ?? db.treinos[0] ?? null;

export function acharExercicio(exId) {
  for (const t of db.treinos) {
    const ex = t.exercicios.find((e) => e.id === exId);
    if (ex) return { treino: t, ex };
  }
  return null;
}

/* ---------- Textos ---------- */

export const repsTxt = (s) => (s.repsMin === s.repsMax ? `${s.repsMin}` : `${s.repsMin}-${s.repsMax}`);

/** "Série 2" (conta só séries de trabalho) ou "Aquec. 1". */
export function rotuloSerie(series, i) {
  const ate = series.slice(0, i + 1);
  return series[i].aquecimento
    ? `Aquec. ${ate.filter((e) => e.aquecimento).length}`
    : `Série ${ate.filter((e) => !e.aquecimento).length}`;
}

/** "3 × 10-12 + 1 drop" */
export function resumoSeries(series) {
  const grupos = [];
  for (const s of series) {
    const ult = grupos.at(-1);
    const chave = `${s.tipo}|${s.repsMin}|${s.repsMax}|${s.degraus}|${s.blocos}|${s.pausa}|${s.reducao}|${s.segundos}`;
    if (ult && ult.chave === chave) ult.qtd++;
    else grupos.push({ chave, qtd: 1, s });
  }
  return grupos
    .map(({ qtd, s }) => {
      if (s.tipo === 'normal') return `${qtd} × ${repsTxt(s)}`;
      if (s.tipo === 'drop') return `${qtd} drop`;
      if (s.tipo === 'restpause') return `${qtd} rest-pause`;
      if (s.tipo === 'tempo') return `${qtd} × ${s.segundos ?? 45} s`;
      return `${qtd} cluster`;
    })
    .join(' + ');
}

/** "80×8" · "80×8 ▸ 60×6 ▸ 40×10" · "80 kg · 3+3+3+2" */
export function textoSerie(e, fmtNum) {
  if (!e) return '—';
  if (emBlocos(e.tipo)) return `${fmtNum(e.carga)} kg · ${e.partes.map((p) => p.reps).join('+')}`;
  if (e.tipo === 'tempo') {
    const t = e.partes[0];
    return `${t.segundos} s${t.carga > 0 ? ` · +${fmtNum(t.carga)} kg` : ''}`;
  }
  if (e.tipo === 'drop') return e.partes.map((p) => `${fmtNum(p.carga)}×${p.reps}`).join(' ▸ ');
  const p = e.partes[0];
  return `${fmtNum(p.carga)} kg × ${p.reps}`;
}

/* ---------- Cálculos ---------- */

export const topoCarga = (e) => (emBlocos(e.tipo) ? e.carga : (e.partes[0]?.carga ?? 0));
export const cargaDaParte = (e, p) => (emBlocos(e.tipo) ? e.carga : p.carga);

/** @param {SerieFeita} e */
export function volumeSerie(e) {
  if (e.aquecimento || e.tipo === 'tempo') return 0;
  return e.partes.reduce((soma, p) => (p.ok ? soma + cargaDaParte(e, p) * (p.reps || 0) : soma), 0);
}
export function volumeSessao(s) {
  let v = 0;
  for (const ex of Object.values(s.exercicios)) for (const e of ex.series) v += volumeSerie(e);
  return v;
}
export const rm1 = (carga, reps) => (reps <= 1 ? carga : carga * (1 + reps / 30));

/* ---------- Sessões ---------- */

/** Última sessão FINALIZADA (antes de `antesDe`) em que o exercício foi feito. */
export function sessaoAnterior(exId, antesDe = Infinity) {
  for (let i = db.sessoes.length - 1; i >= 0; i--) {
    const s = db.sessoes[i];
    if (s.inicio >= antesDe) continue;
    const ex = s.exercicios[exId];
    if (ex && ex.series.some((e) => e.concluida && !e.aquecimento)) return { sessao: s, ex };
  }
  return null;
}

function melhorHistorico(exId, tipo, exceto) {
  let melhor = 0;
  for (const s of db.sessoes) {
    if (s.id === exceto) continue;
    for (const e of s.exercicios[exId]?.series ?? []) {
      if (e.concluida && !e.aquecimento && e.tipo === tipo) melhor = Math.max(melhor, topoCarga(e));
    }
  }
  return melhor;
}

function partesDrop(cargaBase, reps, n, prev, reducao = REDUCAO_DROP) {
  const partes = [];
  for (let i = 0; i < n; i++) {
    if (prev?.tipo === 'drop' && prev.partes[i]) {
      partes.push({ carga: prev.partes[i].carga, reps: prev.partes[i].reps, ok: false });
    } else {
      const carga = i === 0 ? cargaBase : arredonda(partes[i - 1].carga * (1 - reducao));
      partes.push({ carga, reps, ok: false });
    }
  }
  return partes;
}

/** Cria o registro de uma série, já preenchido com o que foi feito na última vez. */
/** @param {SeriePlano} p @param {Partial<SerieFeita> | null} [prev] @returns {SerieFeita} */
export function criarEntrada(p, prev, extra = {}) {
  const cargaBase = prev ? topoCarga(prev) : 0;
  const repsBase = prev?.partes?.[0]?.reps || p.repsMax;
  const comum = { tipo: p.tipo, repsMin: p.repsMin, repsMax: p.repsMax, concluida: false, auto: !prev, ...extra };

  if (emBlocos(p.tipo)) {
    const mesmo = prev?.tipo === p.tipo;
    const n = mesmo ? prev.partes.length : p.blocos;
    return {
      ...comum,
      pausa: p.pausa,
      carga: cargaBase,
      partes: Array.from({ length: n }, (_, i) => ({
        reps: (mesmo ? prev.partes[i]?.reps : null) ?? p.repsMax,
        ok: false,
      })),
    };
  }
  if (p.tipo === 'drop') {
    const reducao = (prev?.tipo === 'drop' && prev.reducao) || p.reducao || REDUCAO_DROP;
    const n = prev?.tipo === 'drop' ? prev.partes.length : p.degraus;
    return { ...comum, reducao, partes: partesDrop(cargaBase, repsBase, n, prev, reducao) };
  }
  if (p.tipo === 'tempo') {
    const mesmo = prev?.tipo === 'tempo';
    const segundos = mesmo ? prev.partes[0].segundos : (p.segundos ?? 45);
    return { ...comum, partes: [{ carga: mesmo ? cargaBase : 0, reps: 0, segundos, ok: false }] };
  }
  return { ...comum, partes: [{ carga: cargaBase, reps: repsBase, ok: false }] };
}

/**
 * Sugere subir a carga quando a mesma série, na última sessão, chegou ao máximo da faixa de reps.
 * Não sugere se o esforço foi 9 ou 10 (RPE), se era aquecimento ou se não era série normal.
 * @param {Partial<SerieFeita> | null} prev a mesma série na sessão anterior
 * @param {number} repsMax máximo da faixa de reps prescrita agora
 * @param {number} passo quanto subir (kg)
 * @returns {{ carga: number, de: number, reps: number } | null}
 */
export function sugerirCarga(prev, repsMax, passo) {
  if (!prev || prev.tipo !== 'normal' || prev.aquecimento || !prev.concluida) return null;
  const { carga, reps } = prev.partes?.[0] ?? {};
  if (!(carga > 0) || !(reps >= repsMax)) return null;
  if (prev.rpe >= RPE_SEGURA_SUGESTAO) return null;
  return { carga: carga + passo, de: carga, reps };
}

/** Garante que o exercício tem registro na sessão e devolve-o. */
export function garantirExercicio(sessao, ex) {
  let reg = sessao.exercicios[ex.id];
  if (!reg) {
    const ant = sessaoAnterior(ex.id, sessao.inicio);
    // Aquecimentos adicionados na hora ficam fora da comparação por posição.
    const anteriores = ant ? ant.ex.series.filter((e) => !(e.aquecimento && e.extra)) : [];
    reg = {
      nome: ex.nome,
      nota: '',
      series: ex.series.map((p, i) => {
        const prev = anteriores.length ? (anteriores[i] ?? anteriores.at(-1)) : null;
        const entrada = criarEntrada(p, prev);
        if (prev?.aquecimento) entrada.aquecimento = true; // lembra que esta posição foi aquecimento
        const sugestao = db.config.sugestaoCarga ? sugerirCarga(prev, p.repsMax, db.config.passo) : null;
        if (sugestao && !entrada.aquecimento) {
          entrada.partes[0].carga = sugestao.carga;
          entrada.sugestao = { de: sugestao.de, reps: sugestao.reps };
        }
        return entrada;
      }),
    };
    sessao.exercicios[ex.id] = reg;
  }
  return reg;
}

export function iniciarSessao(treino) {
  db.ativa = {
    id: uid(),
    treinoId: treino.id,
    nome: treino.nome,
    inicio: Date.now(),
    fim: null,
    exercicios: {},
  };
  return db.ativa;
}

/** Troca a técnica de uma série ainda não concluída, mantendo carga e reps. */
export function converterEntrada(e, tipo) {
  if (e.tipo === tipo) return e;
  const carga = e.tipo === 'tempo' ? 0 : topoCarga(e);
  const reps = e.partes[0]?.reps || e.repsMax;
  const p = {
    tipo,
    repsMin: e.repsMin,
    repsMax: e.repsMax,
    degraus: 3,
    blocos: tipo === 'restpause' ? 3 : 4,
    pausa: 15,
    reducao: e.reducao ?? REDUCAO_DROP,
    segundos: 45,
  };
  /** @type {Partial<SerieFeita>} */
  const base = { tipo: 'normal', partes: [{ carga, reps, ok: false }] };
  const nova = criarEntrada(p, base, { extra: e.extra, aquecimento: e.aquecimento });
  nova.auto = false;
  return nova;
}

export function adicionarDegrau(e) {
  const ult = e.partes.at(-1);
  const reducao = e.reducao ?? REDUCAO_DROP;
  e.partes.push({ carga: Math.max(0, arredonda(ult.carga * (1 - reducao))), reps: ult.reps, ok: false });
}

/** Muda a redução do drop e recalcula os degraus que ainda não foram feitos. */
export function recalcularDrop(e, reducao) {
  e.reducao = reducao;
  for (let k = 1; k < e.partes.length; k++) {
    if (!e.partes[k].ok) e.partes[k].carga = Math.max(0, arredonda(e.partes[k - 1].carga * (1 - reducao)));
  }
}

/**
 * Insere uma série de aquecimento antes das séries de trabalho.
 * Sugere carga pela última sessão ou como fração da primeira série de trabalho.
 * @param {{ series: SerieFeita[] }} reg
 * @param {{ series: SerieFeita[] } | null} [anterior] registro do mesmo exercício na sessão passada
 * @returns {number} posição onde foi inserida
 */
export function adicionarAquecimento(reg, anterior = null) {
  const inseridos = (series) => series.filter((e) => e.aquecimento && e.extra);
  const n = inseridos(reg.series).length;
  const antes = anterior ? inseridos(anterior.series)[n] : null;
  const nivel = Math.min(n, FRACOES_AQUECIMENTO.length - 1);
  const trabalho = reg.series.find((e) => !e.aquecimento);
  const carga = antes
    ? topoCarga(antes)
    : arredonda((trabalho ? topoCarga(trabalho) : 0) * FRACOES_AQUECIMENTO[nivel], 2.5);
  const reps = antes?.partes[0].reps || REPS_AQUECIMENTO[nivel];
  /** @type {SerieFeita} */
  const entrada = {
    tipo: 'normal',
    repsMin: reps,
    repsMax: reps,
    aquecimento: true,
    extra: true,
    concluida: false,
    auto: !antes,
    partes: [{ carga, reps, ok: false }],
  };
  const pos = reg.series.findLastIndex((e) => e.aquecimento && e.extra) + 1;
  reg.series.splice(pos, 0, entrada);
  return pos;
}

/** Série concluída? (todas as partes marcadas) — e recalcula o recorde. */
/** @param {Sessao} sessao */
export function atualizarConclusao(sessao, exId, idx) {
  const reg = sessao.exercicios[exId];
  const e = reg.series[idx];
  const completa = e.partes.length > 0 && e.partes.every((p) => p.ok);
  e.concluida = completa;
  if (!completa || e.aquecimento) {
    e.recorde = false;
    return;
  }
  const topo = topoCarga(e);
  let melhor = melhorHistorico(exId, e.tipo, sessao.id);
  reg.series.forEach((o, i) => {
    if (i !== idx && o.concluida && !o.aquecimento && o.tipo === e.tipo) melhor = Math.max(melhor, topoCarga(o));
  });
  e.recorde = melhor > 0 && topo > melhor;
}

/** Séries seguintes sem histórico herdam a carga que acabou de ser usada. */
export function propagarCarga(reg, idx) {
  const e = reg.series[idx];
  const prox = reg.series[idx + 1];
  if (e.aquecimento || e.tipo === 'tempo') return;
  if (!prox || !prox.auto || prox.concluida || prox.aquecimento || prox.tipo === 'tempo') return;
  const c = topoCarga(e);
  if (emBlocos(prox.tipo)) prox.carga = c;
  else if (prox.tipo === 'drop') {
    prox.partes = partesDrop(c, prox.partes[0].reps, prox.partes.length, null, prox.reducao ?? REDUCAO_DROP);
  } else prox.partes[0].carga = c;
}

export function resumoSessao(s) {
  let series = 0;
  let recordes = 0;
  let feitos = 0;
  for (const reg of Object.values(s.exercicios)) {
    const concl = reg.series.filter((e) => e.concluida && !e.aquecimento);
    series += concl.length;
    recordes += concl.filter((e) => e.recorde).length;
    if (concl.length) feitos++;
  }
  return { series, recordes, feitos, volume: volumeSessao(s), duracao: (s.fim ?? Date.now()) - s.inicio };
}

/** Exercícios com histórico, para o seletor de Progresso. */
export function exerciciosComHistorico() {
  const mapa = new Map();
  for (const s of db.sessoes) {
    for (const [id, reg] of Object.entries(s.exercicios)) {
      if (reg.series.some((e) => e.concluida && !e.aquecimento)) mapa.set(id, reg.nome);
    }
  }
  return [...mapa].map(([id, nome]) => ({ id, nome }));
}

/** Pontos do gráfico: maior carga (séries normais ou 1º degrau do drop) por sessão. */
export function pontosCarga(exId) {
  const pts = [];
  for (const s of db.sessoes) {
    const reg = s.exercicios[exId];
    if (!reg) continue;
    const validas = reg.series.filter(
      (e) => e.concluida && !e.aquecimento && (e.tipo === 'normal' || e.tipo === 'drop'),
    );
    if (!validas.length) continue;
    const melhor = validas.reduce((m, e) => (topoCarga(e) > topoCarga(m) ? e : m), validas[0]);
    pts.push({ ts: s.inicio, carga: topoCarga(melhor), reps: melhor.partes[0].reps, sessao: s });
  }
  return pts;
}

/* ---------- Calendário / frequência ---------- */

export function diasTreinados() {
  const mapa = new Map();
  for (const s of db.sessoes) {
    const k = chaveDia(s.inicio);
    if (!mapa.has(k)) mapa.set(k, []);
    mapa.get(k).push(s);
  }
  return mapa;
}

export const ehSessaoFeita = (s) => resumoSessao(s).series > 0;

/** Grupo muscular de um exercício (plano; senão sugestão pelo nome; senão 'outro'). */
export function musculoDe(exId, nome) {
  return acharExercicio(exId)?.ex.musculo || sugerirMusculo(nome) || 'outro';
}
