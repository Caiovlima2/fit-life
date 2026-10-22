const arquivos = import.meta.glob(
  [
    '/node_modules/lucide-static/icons/{dumbbell,trending-up,calendar,sliders-horizontal,circle-play,timer,hourglass,check,circle-check,plus,minus,chevron-down,chevron-up,chevron-left,chevron-right,pencil,flame,trophy,lightbulb,history,grip-vertical,trash-2,download,upload,arrow-right,arrow-left,pause,play,skip-forward,rotate-ccw,rotate-cw,volume-2,smartphone,lock,zap,notebook-pen,star,wifi-off,x,external-link,flag,arrow-up,arrow-down,equal,sparkles,list-checks,wifi,copy,layers,bell-ring,hand}.svg',
  ],
  { query: '?raw', import: 'default', eager: true },
);

const mapa = {};
for (const [caminho, svg] of Object.entries(arquivos)) {
  const nome = caminho.split('/').pop().replace('.svg', '');
  mapa[nome] = svg;
}

/** Ícone SVG inline (Lucide). */
export function icon(nome, tamanho = 20, classe = '') {
  const svg = mapa[nome];
  if (!svg) return '';
  return svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/width="24"/, `width="${tamanho}"`)
    .replace(/height="24"/, `height="${tamanho}"`)
    .replace(/class="[^"]*"/, `class="ic ${classe}" aria-hidden="true"`);
}
