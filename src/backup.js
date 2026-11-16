/** @typedef {import('./tipos.js').Dados} Dados */

export const APP = 'fit-life';
export const VERSAO_BACKUP = 1;

/**
 * Monta o arquivo de backup. O timer não vai junto (não faz sentido restaurá-lo).
 * @param {Dados} dados
 * @param {number} [agora]
 */
export function montarBackup(dados, agora = Date.now()) {
  return { app: APP, versao: VERSAO_BACKUP, exportadoEm: agora, dados: { ...dados, timer: null } };
}

/**
 * Aceita o pacote do app ou os dados "crus". Devolve os dados, ou null se o formato não servir.
 * @param {any} obj
 * @returns {Dados | null}
 */
export function validarBackup(obj) {
  const dados = obj?.dados ?? obj;
  if (!dados || !Array.isArray(dados.treinos) || !Array.isArray(dados.sessoes)) return null;
  return dados;
}
