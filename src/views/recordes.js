import { get, musculoDe } from '../data.js';
import { recordes } from '../recordes.js';
import { MUSCULOS, NOME_MUSCULO } from '../musculos.js';
import { esc, num, dataCurta, chaveDia } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui } from '../ui.js';
import { commit } from '../data.js';

function quando(ts) {
  const dias = Math.round((Date.now() - ts) / 86400000);
  if (dias <= 0 || chaveDia(ts) === chaveDia(Date.now())) return 'hoje';
  if (dias === 1) return 'ontem';
  if (dias < 30) return `há ${dias} dias`;
  return dataCurta(ts);
}

function cartao(r) {
  const tag = r.novo
    ? `<span class="tag-novo">${icon('trophy', 12)} Novo</span>`
    : `<span class="tag-data">${esc(dataCurta(r.ts))}</span>`;
  return `<article class="card rec">
    <div class="row between"><b class="h-md" style="font-size:16px">${esc(r.nome)}</b>${tag}</div>
    <div class="row between"><span class="rec-v num">${num(r.carga)} <small>kg × ${r.reps}</small></span>${r.delta > 0 ? `<span class="ok sm" style="font-weight:600">↑ +${num(r.delta)} kg</span>` : ''}</div>
    <div class="row between sm mute"><span>1RM estimado ${num(Math.round(r.est))} kg</span><span>${quando(r.ts)}</span></div>
  </article>`;
}

export function abaRecordes() {
  const { itens, batidos30, recente } = recordes(get().sessoes);
  if (!itens.length) {
    return `<div class="vazio">${icon('trophy', 40)}<p><b>Nenhum recorde ainda.</b><br>Finalize séries normais ou drop e suas melhores marcas aparecem aqui. Aquecimento não conta.</p></div>`;
  }
  const comGrupo = itens.map((r) => ({ ...r, g: musculoDe(r.id, r.nome) }));
  const presentes = MUSCULOS.filter(([k]) => comGrupo.some((r) => r.g === k));
  if (ui.recGrupo !== 'todos' && !presentes.some(([k]) => k === ui.recGrupo)) ui.recGrupo = 'todos';
  const lista = comGrupo.filter((r) => ui.recGrupo === 'todos' || r.g === ui.recGrupo);
  const chips = [['todos', 'Todos'], ...presentes]
    .map(
      ([k, n]) =>
        `<button class="chip ${ui.recGrupo === k ? 'on' : ''}" data-a="rec-grupo" data-v="${k}">${n}</button>`,
    )
    .join('');
  return `
    <div class="tiles2">
      <div class="card tile"><span class="caps mute">Últimos 30 dias</span><b class="lime">${batidos30}</b><span class="sm mute">recorde${batidos30 === 1 ? '' : 's'} batido${batidos30 === 1 ? '' : 's'}</span></div>
      <div class="card tile"><span class="caps mute">Marca mais recente</span><b style="font-size:18px;line-height:32px">${recente ? esc(recente.nome) : '—'}</b><span class="sm mute">${recente ? quando(recente.ts) : ''}</span></div>
    </div>
    <div class="periodos">${chips}</div>
    ${lista.map(cartao).join('') || '<p class="mute">Sem recordes neste grupo.</p>'}
    <p class="sm mute">Recorde = maior 1RM estimado em séries normais e drop (1º degrau). Aquecimento, cluster, rest-pause e séries por tempo não entram.</p>`;
}

registrar({
  'rec-grupo': (el) => {
    ui.recGrupo = el.dataset.v;
    commit(() => {});
  },
});

void NOME_MUSCULO;
