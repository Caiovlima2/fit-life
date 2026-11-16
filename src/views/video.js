import { acharExercicio } from '../data.js';
import { lerYoutube, urlEmbed, urlYoutube } from '../video.js';
import { esc } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, abrirSheet, toast } from '../ui.js';

/** Botão que abre o vídeo do exercício (ou avisa que não há link). */
export function botaoVideo(ex, classe, tamanho = 24) {
  const rotulo = ex.video ? `Ver vídeo de ${esc(ex.nome)}` : 'Sem vídeo cadastrado';
  return `<button class="${classe}${ex.video && classe === 'vid' ? ' on' : ''}" data-a="${ex.video ? 'ver-video' : 'sem-video'}" data-id="${ex.id}" aria-label="${rotulo}">${icon('circle-play', tamanho)}${classe === 'chip' ? ' Ver vídeo' : ''}</button>`;
}

function conteudo(ex) {
  const yt = lerYoutube(ex.video);
  if (!yt) {
    return `<p class="mute" style="margin:8px 0 16px">Este link não é do YouTube, então não dá para tocar aqui dentro.</p>
      <a class="btn" href="${esc(ex.video)}" target="_blank" rel="noopener">${icon('external-link', 18)} Abrir link</a>`;
  }
  const player = navigator.onLine
    ? `<div class="video-box"><iframe src="${esc(urlEmbed(yt))}" title="${esc(ex.nome)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`
    : `<div class="video-box off">${icon('wifi-off', 32)}<p>Sem internet. O vídeo precisa de conexão.</p></div>`;
  return `${player}<a class="btn sec mt12" href="${esc(urlYoutube(yt))}" target="_blank" rel="noopener">${icon('external-link', 18)} Abrir no YouTube</a>`;
}

registrar({
  'ver-video': (el) => {
    const ex = acharExercicio(el.dataset.id)?.ex;
    if (!ex?.video) return toast('Sem vídeo cadastrado. Adicione o link em Editar treino.');
    abrirSheet(`<h2 class="h-md" style="margin-bottom:12px">${esc(ex.nome)}</h2>${conteudo(ex)}
      <button class="btn sec mt8" data-a="fechar">Fechar</button>`);
  },
});
