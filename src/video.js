/**
 * Reconhece links do YouTube (watch, youtu.be, shorts, embed, live) e monta a URL de incorporação.
 * @param {string} url
 * @returns {{ id: string, inicio: number } | null}
 */
export function lerYoutube(url) {
  let u;
  try {
    u = new URL(String(url).trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m|music)\./, '');
  let id = '';
  if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const [, tipo, resto] = u.pathname.split('/');
    if (tipo === 'watch') id = u.searchParams.get('v') ?? '';
    else if (['shorts', 'embed', 'live', 'v'].includes(tipo)) id = resto ?? '';
  }
  if (!/^[\w-]{11}$/.test(id)) return null;
  return { id, inicio: segundosDe(u.searchParams.get('t') ?? u.searchParams.get('start') ?? '') };
}

/** "90", "90s" ou "1m30s" -> segundos. */
function segundosDe(t) {
  if (/^\d+$/.test(t)) return Number(t);
  const m = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(t);
  return m && t ? Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0) : 0;
}

/** @param {{ id: string, inicio: number }} v */
export function urlEmbed({ id, inicio }) {
  const q = new URLSearchParams({ rel: '0', playsinline: '1', modestbranding: '1' });
  if (inicio > 0) q.set('start', String(inicio));
  return `https://www.youtube-nocookie.com/embed/${id}?${q}`;
}

/** Link normal para abrir no app/site do YouTube. */
export const urlYoutube = ({ id, inicio }) => `https://youtu.be/${id}${inicio > 0 ? `?t=${inicio}` : ''}`;

/** Busca no YouTube pelo nome do exercício (o usuário escolhe o vídeo e cola o link). */
export const urlBuscaYoutube = (nome) =>
  `https://www.youtube.com/results?${new URLSearchParams({ search_query: `${nome} execução` })}`;
