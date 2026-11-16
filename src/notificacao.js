/*
 * AVISO DO TIMER FORA DO APP
 * Usa a notificação do Service Worker (a única que o Android aceita). Dispara quando o timer
 * termina com o app em segundo plano. Limite: se o Android suspender o app por completo, o aviso
 * só sai quando o app voltar a rodar — o navegador não oferece agendamento confiável sem servidor.
 */

export const suportado = () => typeof Notification !== 'undefined' && 'serviceWorker' in navigator;
export const permissao = () => (suportado() ? Notification.permission : 'unsupported');

/** Pede permissão (precisa ser chamado a partir de um toque). */
export async function pedirPermissao() {
  if (!suportado()) return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

/** Texto da notificação para o timer que terminou. @param {{ tipo: string, proxima?: { texto: string } | null }} t */
export function conteudo(t) {
  if (t.tipo === 'pausa') return { titulo: 'Pausa terminou', corpo: t.proxima?.texto ?? 'Continue a série.' };
  if (t.tipo === 'tempo') return { titulo: 'Tempo acabou', corpo: t.proxima?.texto ?? 'Série por tempo concluída.' };
  return { titulo: 'Descanso terminou', corpo: t.proxima?.texto ?? 'Hora da próxima série.' };
}

export async function mostrar(t) {
  if (permissao() !== 'granted') return;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const { titulo, corpo } = conteudo(t);
    // vibrate/renotify existem no Android/Chrome, mas faltam nos tipos do TypeScript.
    await reg?.showNotification(
      titulo,
      /** @type {NotificationOptions} */ (
        /** @type {any} */ ({
          body: corpo,
          tag: 'timer',
          icon: 'icon-192.png',
          badge: 'icon-192.png',
          vibrate: [250, 100, 250, 100, 500],
          renotify: true,
        })
      ),
    );
  } catch {
    /* sem notificação: o alerta sonoro/vibração continuam */
  }
}

/** Remove o aviso quando o usuário volta ao app. */
export async function limpar() {
  if (!suportado()) return;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    (await reg?.getNotifications({ tag: 'timer' }))?.forEach((n) => n.close());
  } catch {
    /* ignora */
  }
}
