// Importado pelo service worker gerado pelo vite-plugin-pwa (ver vite.config.js).
// Ao tocar no aviso do timer, volta para o app já aberto (ou abre um novo).
self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
      const aberta = janelas[0];
      return aberta ? aberta.focus() : self.clients.openWindow('./');
    }),
  );
});
