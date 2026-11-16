import { get, commit, musculoDe } from '../data.js';
import { volumeSemana, historicoGrupo, inicioSemana, situacao } from '../volume.js';
import { MUSCULOS, NOME_MUSCULO } from '../musculos.js';
import { esc, dataCurta, fmt } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui } from '../ui.js';

const TEXTO = { abaixo: 'Abaixo da faixa', faixa: 'Na faixa', acima: 'Acima da faixa' };
const COR = { abaixo: 'var(--mod)', faixa: 'var(--lime)', acima: 'var(--pes)' };

function rotuloSemana(ini) {
  const fim = new Date(ini);
  fim.setDate(fim.getDate() + 6);
  const faixa = `${fmt(ini, { day: 'numeric' })}–${fmt(fim, { day: 'numeric', month: 'short' }).replace('.', '')}`;
  return ui.volSemana === 0 ? `Esta semana · ${faixa}` : faixa;
}

function seletorSemana(ini) {
  return `<div class="semana">
    <button class="ib" data-a="vol-sem" data-d="-1" aria-label="Semana anterior">${icon('chevron-left', 20)}</button>
    <b class="grow" style="text-align:center">${esc(rotuloSemana(ini))}</b>
    <button class="ib" data-a="vol-sem" data-d="1" aria-label="Próxima semana" ${ui.volSemana >= 0 ? 'disabled' : ''}>${icon('chevron-right', 20)}</button>
  </div>`;
}

function textoFalta(s, series, min, max) {
  if (s === 'abaixo') return `Abaixo da faixa · ${min - series === 1 ? 'falta 1' : `faltam ${min - series}`}`;
  if (s === 'acima') return `Acima da faixa · ${series - max} a mais`;
  return TEXTO[s];
}

export function abaVolume() {
  const d = get();
  const { volMin: min, volMax: max } = d.config;
  const ini = inicioSemana(ui.volSemana);
  const { total, grupos } = volumeSemana(d.sessoes, ini, musculoDe);
  const topo = Math.max(max * 1.2, ...Object.values(grupos).map((g) => g.series));
  const chaves = MUSCULOS.map(([k]) => k).filter((k) => grupos[k]);
  const linhas = chaves
    .sort((a, b) => grupos[b].series - grupos[a].series)
    .map((k) => {
      const n = grupos[k].series;
      const s = situacao(n, min, max);
      return `<button class="grp" data-a="vol-grupo" data-v="${k}">
        <span class="row"><b class="h-md" style="font-size:15px">${NOME_MUSCULO[k]}</b><span class="grow"></span><b class="num" style="color:${COR[s]}">${n}</b></span>
        <span class="barra"><i class="faixa" style="left:${(min / topo) * 100}%;width:${((max - min) / topo) * 100}%"></i><i class="enche" style="width:${(n / topo) * 100}%;background:${COR[s]}"></i></span>
        <span class="sm mute">${textoFalta(s, n, min, max)}</span>
      </button>`;
    })
    .join('');
  return `
    ${seletorSemana(ini)}
    <div class="row between" style="margin:14px 0 10px"><div><span class="caps mute">Séries de trabalho</span><div class="h-lg num">${total} <small class="mute" style="font-size:14px;font-weight:500">na semana</small></div></div><span class="sm mute"><i class="leg-faixa"></i>${min}–${max}</span></div>
    ${linhas ? `<section class="card grupos">${linhas}</section>` : `<div class="vazio">${icon('trending-up', 36)}<p>Nenhuma série de trabalho nesta semana.</p></div>`}
    <p class="sm mute">Só séries de trabalho. Aquecimento fica de fora. Toque num grupo para ver os exercícios.</p>`;
}

export function detalheGrupo() {
  const d = get();
  const k = ui.volGrupo;
  const ini = inicioSemana(ui.volSemana);
  const { grupos } = volumeSemana(d.sessoes, ini, musculoDe);
  const g = grupos[k] ?? { series: 0, exercicios: [] };
  const s = situacao(g.series, d.config.volMin, d.config.volMax);
  const hist = historicoGrupo(d.sessoes, k, 4, musculoDe, ini + 3 * 86400000);
  const topo = Math.max(1, ...hist.map((h) => h.series));
  const colunas = hist
    .map(
      (h, i) =>
        `<div class="col ${i === 3 ? 'on' : ''}"><b class="${i === 3 ? '' : 'mute'}">${h.series}</b><i style="height:${Math.max(4, (h.series / topo) * 90)}px"></i><span class="sm mute">${i === 3 && ui.volSemana === 0 ? 'Atual' : esc(dataCurta(h.ini))}</span></div>`,
    )
    .join('');
  const exs = [...g.exercicios]
    .sort((a, b) => a.ts - b.ts)
    .map(
      (e) =>
        `<div class="ex-vol"><div class="grow"><b>${esc(e.nome)}</b><div class="sm mute">${esc(fmt(e.ts, { weekday: 'short' }).replace('.', ''))} · ${e.series} série${e.series === 1 ? '' : 's'}</div></div><b class="h-md num">${e.series}</b></div>`,
    )
    .join('');
  return `
    <div><div class="caps lime">${esc(rotuloSemana(ini))}</div><h2 class="h-lg" style="margin:2px 0">${NOME_MUSCULO[k] ?? 'Grupo'}</h2>
    <div class="mute"><b style="color:var(--txt)">${g.series} série${g.series === 1 ? '' : 's'}</b> de trabalho · ${TEXTO[s].toLowerCase()} (${d.config.volMin} a ${d.config.volMax})</div></div>
    <section class="card mt12"><span class="caps mute">Últimas 4 semanas</span><div class="cols4">${colunas}</div></section>
    <section class="card mt12"><span class="caps mute">Exercícios desta semana</span>${exs || '<p class="mute" style="margin:8px 0 0">Nada nesta semana.</p>'}</section>
    <p class="sm mute">Aquecimento não entra na conta. Drop, cluster e rest-pause contam como 1 série.</p>`;
}

registrar({
  'vol-sem': (el) => {
    ui.volSemana = Math.min(0, ui.volSemana + Number(el.dataset.d));
    commit(() => {});
  },
  'vol-grupo': (el) => {
    ui.volGrupo = el.dataset.v;
    commit(() => {});
  },
  'vol-voltar': () => {
    ui.volGrupo = null;
    commit(() => {});
  },
});
