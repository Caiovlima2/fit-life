import '@fontsource/space-grotesk/latin-500.css';
import '@fontsource/space-grotesk/latin-600.css';
import '@fontsource/space-grotesk/latin-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './style.css';

import { carregar, onChange, get } from './data.js';
import { acoes, entradas, ui } from './ui.js';
import { icon } from './lib/icons.js';
import * as timer from './timer.js';
import { hoje } from './views/hoje.js';
import { exercicio, prepararExercicio } from './views/exercicio.js';
import { editar } from './views/editar.js';
import { progresso } from './views/progresso.js';
import { historico, sessao } from './views/historico.js';
import { ajustes } from './views/ajustes.js';
import { timerView, barraTimer, atualizarTick } from './views/timer.js';
import { duracao, inteiro, lerNumero } from './lib/util.js';

const $ = (s) => document.querySelector(s);
let viewAtual = null;
let rotaAnterior = null;
let rota = { nome: 'hoje', arg: null };

function lerRota() {
  const partes = location.hash.replace(/^#\/?/, '').split('/');
  return { nome: partes[0] || 'hoje', arg: partes[1] ?? null };
}

const NAV = [
  ['hoje', '#/', 'dumbbell', 'Treino', ['hoje', 'exercicio', 'editar', 'timer']],
  ['progresso', '#/progresso', 'trending-up', 'Progresso', ['progresso']],
  ['historico', '#/historico', 'calendar', 'Histórico', ['historico', 'sessao']],
  ['ajustes', '#/ajustes', 'sliders-horizontal', 'Ajustes', ['ajustes']],
];

function desenharNav() {
  $('#nav').innerHTML = NAV.map(
    ([, href, ic, rotulo, grupo]) =>
      `<a href="${href}" class="${grupo.includes(rota.nome) ? 'on' : ''}" ${grupo.includes(rota.nome) ? 'aria-current="page"' : ''}>${icon(ic, 24)}<span>${rotulo}</span></a>`,
  ).join('');
}

function desenharDock() {
  const dock = $('#dock');
  const semTimer = viewAtual?.semDock || rota.nome === 'timer';
  dock.innerHTML = `${semTimer ? '' : barraTimer()}${viewAtual?.cta ?? ''}`;
  document.documentElement.style.setProperty('--dock-h', dock.children.length ? `${dock.offsetHeight}px` : '0px');
}

function render() {
  rota = lerRota();
  const d = get();
  let v;
  switch (rota.nome) {
    case 'exercicio':
      prepararExercicio(rota.arg);
      v = exercicio({ id: rota.arg });
      break;
    case 'editar':
      v = editar();
      break;
    case 'timer':
      v = timerView();
      break;
    case 'progresso':
      v = progresso();
      break;
    case 'historico':
      v = historico();
      break;
    case 'sessao':
      v = sessao({ id: rota.arg });
      break;
    case 'ajustes':
      v = ajustes();
      break;
    default:
      v = hoje();
  }
  viewAtual = v;
  const chave = `${rota.nome}/${rota.arg ?? ''}`;
  const y = window.scrollY;

  $('#topbar').innerHTML = v.top;
  $('#view').innerHTML = v.html;
  document.body.classList.toggle('sem-nav', !v.nav);
  desenharNav();
  desenharDock();

  if (chave !== rotaAnterior) window.scrollTo(0, 0);
  else window.scrollTo(0, y);
  rotaAnterior = chave;

  if (ui.rolarAtiva) {
    ui.rolarAtiva = false;
    requestAnimationFrame(() => document.querySelector('.serie.ativa')?.scrollIntoView({ block: 'center', behavior: 'smooth' }));
  }
  timer.manterTelaLigada(!!d.ativa && d.config.telaLigada);
}

/* ---------- Eventos ---------- */

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-a]');
  if (!el) return;
  const fn = acoes[el.dataset.a];
  if (!fn) return;
  ev.preventDefault();
  timer.destravarAudio();
  fn(el, ev);
});

document.addEventListener('keydown', (ev) => {
  if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches?.('[role="button"][data-a]')) {
    ev.preventDefault();
    ev.target.click();
  }
  if (ev.key === 'Enter' && ev.target.matches?.('input.num-input')) ev.target.blur();
});

document.addEventListener('input', (ev) => {
  const el = ev.target;
  const nome = el.dataset?.in;
  if (!nome || el.type === 'file' || el.tagName === 'SELECT') return;
  entradas[nome]?.(el.dataset, el.value, el, 'input');
});

document.addEventListener('change', (ev) => {
  const el = ev.target;
  const nome = el.dataset?.in;
  if (!nome) return;
  if (el.type === 'file' || el.tagName === 'SELECT') {
    entradas[nome]?.(el.dataset, el.value, el, 'change');
    return;
  }
  // Ao sair do campo numérico, só padroniza o texto (sem redesenhar, para não perder o toque seguinte).
  if (el.dataset.fmt != null) {
    const n = lerNumero(el.value) ?? 0;
    el.value = el.dataset.fmt === '1' ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(n) : String(Math.round(n));
  }
});

window.addEventListener('hashchange', render);
window.addEventListener('online', render);
window.addEventListener('offline', render);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') timer.manterTelaLigada(!!get().ativa && get().config.telaLigada);
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  ui.instalar = e;
  if (rota.nome === 'ajustes') render();
});
window.addEventListener('appinstalled', () => {
  ui.instalar = null;
  if (rota.nome === 'ajustes') render();
});

/* ---------- Início ---------- */

carregar();
onChange(render);
timer.ouvintes.mudou = () => {
  desenharDock();
  if (rota.nome === 'timer') render();
};
timer.ouvintes.tick = () => {
  atualizarTick();
  document.querySelectorAll('[data-dur]').forEach((el) => {
    el.textContent = duracao(Date.now() - Number(el.dataset.dur));
  });
};
timer.iniciarRelogio();
new ResizeObserver(() => {
  const dock = $('#dock');
  document.documentElement.style.setProperty('--dock-h', dock.children.length ? `${dock.offsetHeight}px` : '0px');
}).observe($('#dock'));

render();

// Se o timer terminou enquanto o app estava fechado, confere agora.
timer.tick();

import('virtual:pwa-register')
  .then(({ registerSW }) => registerSW({ immediate: true }))
  .catch(() => {});

void inteiro;
