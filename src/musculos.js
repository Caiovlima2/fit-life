/** Grupos musculares padronizados (a chave é o que fica salvo no exercício). */
export const MUSCULOS = [
  ['peito', 'Peito'],
  ['costas', 'Costas'],
  ['pernas', 'Pernas'],
  ['ombros', 'Ombros'],
  ['biceps', 'Bíceps'],
  ['triceps', 'Tríceps'],
  ['abdomen', 'Abdômen'],
  ['gluteos', 'Glúteos'],
  ['panturrilha', 'Panturrilha'],
  ['outro', 'Outro'],
];

export const NOME_MUSCULO = Object.fromEntries(MUSCULOS);

const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Regras em ordem: a primeira que casar vence (as mais específicas vêm antes). */
/** @type {[string, RegExp][]} */
const REGRAS = [
  ['panturrilha', /panturrilha|gemeos|\bcalf\b|soleo/],
  ['gluteos', /gluteo|hip thrust|elevacao pelvica|abdutora|coice/],
  ['abdomen', /abdom|prancha|crunch|obliquo|\binfra\b/],
  ['triceps', /triceps|testa|frances|paralelas|mergulho|\bdips\b/],
  ['biceps', /biceps|rosca|martelo|scott/],
  [
    'ombros',
    /ombro|desenvolvimento|elevacao lateral|elevacao frontal|crucifixo inverso|face pull|militar|arnold|encolhimento|trapezio/,
  ],
  ['peito', /supino|peito|peitoral|crucifixo|crossover|voador|peck deck|\bfly\b|flexao de braco/],
  ['costas', /puxada|remada|barra fixa|serrote|pulldown|costas|dorsal|pullover|hiperextensao|lombar/],
  [
    'pernas',
    /agacha|\bleg\b|flexora|extensora|stiff|terra|afundo|passada|\bhack\b|avanco|bulgaro|perna|quadriceps|posterior|adutora|romeno/,
  ],
];

/** Sugere o grupo pelo nome do exercício. Devolve '' quando não reconhece. @param {string} nome */
export function sugerirMusculo(nome) {
  const n = semAcento(String(nome ?? ''));
  return REGRAS.find(([, re]) => re.test(n))?.[0] ?? '';
}
