/**
 * Tipos do modelo de dados (apenas documentação para o editor e para `npm run tipos`).
 * Este arquivo não tem código de execução.
 */

/** @typedef {'normal' | 'drop' | 'cluster' | 'restpause' | 'tempo'} TipoSerie */
/** @typedef {'leve' | 'moderada' | 'pesada'} Intensidade */

/**
 * Prescrição de UMA série (o que o personal pediu).
 * @typedef {object} SeriePlano
 * @property {TipoSerie} tipo
 * @property {number} repsMin
 * @property {number} repsMax
 * @property {number} degraus  Degraus do drop set.
 * @property {number} blocos   Mini-blocos do cluster set.
 * @property {number} pausa    Pausa (s) entre mini-blocos (cluster e rest-pause).
 * @property {number} reducao  Redução de carga por degrau do drop (0.2 = 20%).
 * @property {number} segundos Alvo (s) da série por tempo.
 */

/**
 * @typedef {object} ExercicioPlano
 * @property {string} id
 * @property {string} nome
 * @property {string} grupo    Descrição livre do músculo.
 * @property {string} musculo  Grupo padronizado (chave de MUSCULOS) usado no volume semanal.
 * @property {Intensidade} intensidade
 * @property {number} descanso  Descanso entre séries (s).
 * @property {string} video     URL do vídeo (pode ser vazio).
 * @property {string} nota
 * @property {SeriePlano[]} series
 */

/**
 * @typedef {object} Treino
 * @property {string} id
 * @property {string} nome
 * @property {string} foco
 * @property {ExercicioPlano[]} exercicios
 */

/**
 * Uma parte realizada: normal = 1 · drop = 1 por degrau · cluster = 1 por mini-bloco.
 * @typedef {object} Parte
 * @property {number} [carga]  Ausente em cluster/rest-pause (a carga é da série). No tempo, é o peso extra.
 * @property {number} reps
 * @property {number} [segundos]  Só na série por tempo.
 * @property {boolean} ok
 */

/**
 * Uma série realizada.
 * @typedef {object} SerieFeita
 * @property {TipoSerie} tipo
 * @property {number} repsMin
 * @property {number} repsMax
 * @property {Parte[]} partes
 * @property {number} [carga]  Só em cluster e rest-pause.
 * @property {number} [pausa]  Só em cluster e rest-pause.
 * @property {number} [reducao]  Só no drop.
 * @property {boolean} [aquecimento]  Fora de recordes, volume e sugestão.
 * @property {number} [rpe]  Esforço percebido, 6 a 10.
 * @property {{ de: number, reps: number }} [sugestao]  A carga foi aumentada por sugestão; guarda a carga e as reps da última vez.
 * @property {boolean} concluida
 * @property {boolean} [recorde]
 * @property {boolean} auto    Carga ainda é um palpite (sem histórico).
 * @property {boolean} [extra] Série adicionada fora do plano.
 * @property {number} [descansoReal]  Descanso medido (s).
 */

/**
 * @typedef {object} ExercicioFeito
 * @property {string} nome
 * @property {string} nota
 * @property {SerieFeita[]} series
 */

/**
 * @typedef {object} Sessao
 * @property {string} id
 * @property {string} treinoId
 * @property {string} nome
 * @property {number} inicio  Timestamp (ms).
 * @property {number | null} fim
 * @property {Object<string, ExercicioFeito>} exercicios  Chave = id do exercício do plano.
 */

/**
 * @typedef {object} Config
 * @property {boolean} som
 * @property {boolean} vibracao
 * @property {boolean} telaLigada
 * @property {boolean} autoDescanso
 * @property {boolean} rpe  Perguntar o esforço depois de cada série.
 * @property {boolean} sugestaoCarga  Sugerir aumento de carga quando bateu o máximo de reps.
 * @property {number} passo        Incremento dos botões +/− de carga (kg).
 * @property {number} metaSemanal  Treinos por semana.
 * @property {number} volMin  Início da faixa de séries por grupo na semana.
 * @property {number} volMax  Fim da faixa.
 * @property {'escuro' | 'claro' | 'auto'} tema  Aparência do app.
 * @property {boolean} notificacao  Avisar pelo sistema quando o timer terminar com o app em segundo plano.
 */

/**
 * @typedef {object} Timer
 * @property {number} inicio
 * @property {number | null} fim        null quando pausado.
 * @property {number | null} restante   Só quando pausado (ms).
 * @property {number} total             Alvo (s).
 * @property {'descanso' | 'pausa' | 'tempo'} tipo
 * @property {{ exId: string, idx: number } | null} ref
 * @property {{ texto: string, exId: string } | null} proxima
 * @property {boolean} terminou
 */

/**
 * Raiz do que é salvo no localStorage.
 * @typedef {object} Dados
 * @property {number} v
 * @property {Treino[]} treinos
 * @property {string | null} treinoAtual
 * @property {Sessao[]} sessoes
 * @property {Sessao | null} ativa
 * @property {Timer | null} timer
 * @property {number | null} ultimoBackup
 * @property {Config} config
 */

export {};
