import { uid, arredonda, chaveDia } from './lib/util.js';

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

const CHAVE = 'fitlife:v1';
export const TIPOS = { normal: 'Normal', drop: 'Drop set', cluster: 'Cluster' };
export const INTENSIDADES = { leve: 'Leve', moderada: 'Moderada', pesada: 'Pesada' };
export const PRESETS_DESCANSO = [45, 60, 90, 120, 180];
export const REDUCAO_DROP = 0.2;

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

function migrar(d) {
  const base = padrao();
  d.config = { ...base.config, ...(d.config || {}) };
  d.treinos = Array.isArray(d.treinos) ? d.treinos : base.treinos;
  d.sessoes = Array.isArray(d.sessoes) ? d.sessoes : [];
  d.ativa ??= null;
  d.timer ??= null;
  d.ultimoBackup ??= null;
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
    config: { som: true, vibracao: true, telaLigada: true, autoDescanso: true, passo: 2.5, metaSemanal: 4 },
  };
}

/* ---------- Prescrição ---------- */

export function novaSerie(tipo = 'normal', repsMin = 10, repsMax = 12) {
  return { tipo, repsMin, repsMax, degraus: 3, blocos: 4, pausa: 15 };
}

export function novoExercicio(nome = 'Novo exercício') {
  return {
    id: uid(),
    nome,
    grupo: '',
    intensidade: 'moderada',
    descanso: 90,
    video: '',
    nota: '',
    series: [novaSerie(), novaSerie(), novaSerie()],
  };
}

export function novoTreino(nome = 'Novo treino') {
  return { id: uid(), nome, foco: '', exercicios: [] };
}

function treinoExemplo() {
  const ex = (nome, grupo, intensidade, descanso, series, nota = '') => ({
    id: uid(),
    nome,
    grupo,
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
      ex('Supino Reto com Barra', 'Peitoral maior · Composto', 'pesada', 120, n(4, 8, 10), 'Escápulas travadas no banco. Não estalar os cotovelos no topo.'),
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

/** "3 × 10-12 + 1 drop" */
export function resumoSeries(series) {
  const grupos = [];
  for (const s of series) {
    const ult = grupos.at(-1);
    const chave = `${s.tipo}|${s.repsMin}|${s.repsMax}|${s.degraus}|${s.blocos}|${s.pausa}`;
    if (ult && ult.chave === chave) ult.qtd++;
    else grupos.push({ chave, qtd: 1, s });
  }
  return grupos
    .map(({ qtd, s }) => {
      if (s.tipo === 'normal') return `${qtd} × ${repsTxt(s)}`;
      if (s.tipo === 'drop') return `${qtd} drop`;
      return `${qtd} cluster`;
    })
    .join(' + ');
}

/** "80×8" · "80×8 ▸ 60×6 ▸ 40×10" · "80 kg · 3+3+3+2" */
export function textoSerie(e, fmtNum) {
  if (!e) return '—';
  if (e.tipo === 'cluster') return `${fmtNum(e.carga)} kg · ${e.partes.map((p) => p.reps).join('+')}`;
  if (e.tipo === 'drop') return e.partes.map((p) => `${fmtNum(p.carga)}×${p.reps}`).join(' ▸ ');
  const p = e.partes[0];
  return `${fmtNum(p.carga)} kg × ${p.reps}`;
}

/* ---------- Cálculos ---------- */

export const topoCarga = (e) => (e.tipo === 'cluster' ? e.carga : (e.partes[0]?.carga ?? 0));
export const cargaDaParte = (e, p) => (e.tipo === 'cluster' ? e.carga : p.carga);

export function volumeSerie(e) {
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
    if (ex && ex.series.some((e) => e.concluida)) return { sessao: s, ex };
  }
  return null;
}

function melhorHistorico(exId, tipo, exceto) {
  let melhor = 0;
  for (const s of db.sessoes) {
    if (s.id === exceto) continue;
    for (const e of s.exercicios[exId]?.series ?? []) {
      if (e.concluida && e.tipo === tipo) melhor = Math.max(melhor, topoCarga(e));
    }
  }
  return melhor;
}

function partesDrop(cargaBase, reps, n, prev) {
  const partes = [];
  for (let i = 0; i < n; i++) {
    if (prev?.tipo === 'drop' && prev.partes[i]) {
      partes.push({ carga: prev.partes[i].carga, reps: prev.partes[i].reps, ok: false });
    } else {
      const carga = i === 0 ? cargaBase : arredonda(partes[i - 1].carga * (1 - REDUCAO_DROP));
      partes.push({ carga, reps, ok: false });
    }
  }
  return partes;
}

/** Cria o registro de uma série, já preenchido com o que foi feito na última vez. */
export function criarEntrada(p, prev, extra = {}) {
  const cargaBase = prev ? topoCarga(prev) : 0;
  const repsBase = prev?.partes?.[0]?.reps ?? p.repsMax;
  const comum = { tipo: p.tipo, repsMin: p.repsMin, repsMax: p.repsMax, concluida: false, auto: !prev, ...extra };

  if (p.tipo === 'cluster') {
    const n = prev?.tipo === 'cluster' ? prev.partes.length : p.blocos;
    return {
      ...comum,
      pausa: p.pausa,
      carga: cargaBase,
      partes: Array.from({ length: n }, (_, i) => ({
        reps: (prev?.tipo === 'cluster' ? prev.partes[i]?.reps : null) ?? p.repsMax,
        ok: false,
      })),
    };
  }
  if (p.tipo === 'drop') {
    const n = prev?.tipo === 'drop' ? prev.partes.length : p.degraus;
    return { ...comum, partes: partesDrop(cargaBase, repsBase, n, prev) };
  }
  return { ...comum, partes: [{ carga: cargaBase, reps: repsBase, ok: false }] };
}

/** Garante que o exercício tem registro na sessão e devolve-o. */
export function garantirExercicio(sessao, ex) {
  let reg = sessao.exercicios[ex.id];
  if (!reg) {
    const ant = sessaoAnterior(ex.id, sessao.inicio);
    reg = {
      nome: ex.nome,
      nota: '',
      series: ex.series.map((p, i) => {
        const prev = ant ? (ant.ex.series[i] ?? ant.ex.series.at(-1)) : null;
        return criarEntrada(p, prev);
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
  const carga = topoCarga(e);
  const reps = e.partes[0]?.reps ?? e.repsMax;
  const p = { tipo, repsMin: e.repsMin, repsMax: e.repsMax, degraus: 3, blocos: 4, pausa: 15 };
  const nova = criarEntrada(p, { tipo: 'normal', partes: [{ carga, reps }] }, { extra: e.extra });
  nova.auto = false;
  return nova;
}

export function adicionarDegrau(e) {
  const ult = e.partes.at(-1);
  e.partes.push({ carga: Math.max(0, arredonda(ult.carga * (1 - REDUCAO_DROP))), reps: ult.reps, ok: false });
}

/** Série concluída? (todas as partes marcadas) — e recalcula o recorde. */
export function atualizarConclusao(sessao, exId, idx) {
  const reg = sessao.exercicios[exId];
  const e = reg.series[idx];
  const completa = e.partes.length > 0 && e.partes.every((p) => p.ok);
  e.concluida = completa;
  if (!completa) {
    e.recorde = false;
    return;
  }
  const topo = topoCarga(e);
  let melhor = melhorHistorico(exId, e.tipo, sessao.id);
  reg.series.forEach((o, i) => {
    if (i !== idx && o.concluida && o.tipo === e.tipo) melhor = Math.max(melhor, topoCarga(o));
  });
  e.recorde = melhor > 0 && topo > melhor;
}

/** Séries seguintes sem histórico herdam a carga que acabou de ser usada. */
export function propagarCarga(reg, idx) {
  const e = reg.series[idx];
  const prox = reg.series[idx + 1];
  if (!prox || !prox.auto || prox.concluida) return;
  const c = topoCarga(e);
  if (prox.tipo === 'cluster') prox.carga = c;
  else if (prox.tipo === 'drop') prox.partes = partesDrop(c, prox.partes[0].reps, prox.partes.length, null);
  else prox.partes[0].carga = c;
}

export function resumoSessao(s) {
  let series = 0;
  let recordes = 0;
  let feitos = 0;
  for (const reg of Object.values(s.exercicios)) {
    const concl = reg.series.filter((e) => e.concluida);
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
      if (reg.series.some((e) => e.concluida)) mapa.set(id, reg.nome);
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
    const validas = reg.series.filter((e) => e.concluida && (e.tipo === 'normal' || e.tipo === 'drop'));
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
