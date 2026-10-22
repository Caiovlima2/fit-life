import { get, commit, substituirTudo } from '../data.js';
import { esc, num, fmt, limitar } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui, toast, confirmar } from '../ui.js';
import { baixar } from './historico.js';
import * as timer from '../timer.js';

export const VERSAO = '0.1.0';

const instalado = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

function tamanhoDados() {
  try {
    return new Blob([localStorage.getItem('fitlife:v1') ?? '']).size;
  } catch {
    return 0;
  }
}

const interruptor = (k, ligado, ic, titulo, desc) => `
  <button class="opt" data-a="toggle" data-k="${k}" role="switch" aria-checked="${ligado}">
    <span class="ic-b">${icon(ic, 22)}</span>
    <span class="grow"><b>${titulo}</b><span class="d">${desc}</span></span>
    <span class="switch ${ligado ? 'on' : ''}"></span>
  </button>`;

export function ajustes() {
  const d = get();
  const c = d.config;
  const bytes = tamanhoDados();
  const kb = bytes / 1024;
  const pctUso = Math.min(100, (bytes / (5 * 1024 * 1024)) * 100);
  const pronto = !!navigator.serviceWorker?.controller;

  const blocoInstalar = instalado()
    ? `<section class="card"><div class="row" style="gap:12px"><span class="ok">${icon('circle-check', 24)}</span><div><b class="h-md" style="font-size:17px">App instalado</b><div class="sm mute">Abrindo em tela cheia, direto da tela inicial.</div></div></div></section>`
    : `<section class="card install">
        <div class="row" style="gap:12px;align-items:flex-start"><span class="icone-q" style="width:52px;height:52px">${icon('smartphone', 26)}</span>
        <div class="grow"><b class="h-md">Instalar app no celular</b>
        <p class="mute" style="margin:6px 0 0">Ícone na tela inicial, tela cheia e uso 100% offline na academia.</p></div></div>
        ${ui.instalar ? `<button class="btn mt16" data-a="instalar">${icon('download', 20)} Instalar agora</button>` : `<p class="sm mute" style="margin:12px 0 0">No Chrome do Android: menu <b>⋮</b> → <b>Instalar app</b> (ou “Adicionar à tela inicial”).</p>`}
      </section>`;

  const html = `
    <section class="card" style="margin-top:8px">
      <div class="row between"><b class="h-md">Fit Life</b><span class="badge neutro">v${VERSAO}</span></div>
      <p class="mute" style="margin:6px 0 0">Seus treinos e cargas ficam salvos só neste aparelho. Sem conta, sem internet.</p>
    </section>
    ${blocoInstalar}
    <section class="card">
      <div class="row between"><span class="caps ${pronto ? 'ok' : 'mute'}">● ${pronto ? 'Modo offline pronto' : 'Offline ainda não preparado'}</span><span class="sm mute">${navigator.onLine ? 'Online' : 'Sem internet'}</span></div>
      <p class="sm mute" style="margin:8px 0 10px">${pronto ? 'O app abre mesmo sem sinal.' : 'Abra o app uma vez com internet para ele ficar disponível offline.'}</p>
      <div class="bar"><i style="width:${Math.max(2, pctUso)}%;background:var(--ok)"></i></div>
      <div class="row between mt8"><span class="caps mute">${num(Math.round(kb * 10) / 10)} KB ocupados</span><span class="caps mute">Limite seguro ~5 MB</span></div>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Treino e notificações</h2>
    <section class="card" style="padding:4px 16px">
      ${interruptor('som', c.som, 'volume-2', 'Sons do timer', 'Bip ao terminar o descanso')}
      ${interruptor('vibracao', c.vibracao, 'smartphone', 'Vibração', 'Vibra ao fim do descanso e ao salvar série')}
      ${interruptor('telaLigada', c.telaLigada, 'lock', 'Manter tela sempre acesa', 'Evita bloquear durante o treino')}
      ${interruptor('autoDescanso', c.autoDescanso, 'timer', 'Iniciar descanso automático', 'Ao confirmar a série')}
    </section>
    <section class="card">
      <b class="h-md" style="font-size:17px">Incremento padrão de carga</b>
      <p class="sm mute" style="margin:4px 0 12px">Passo dos botões + e − ao registrar.</p>
      <div class="passos">${[2.5, 1, 0.5].map((v) => `<button class="${c.passo === v ? 'on' : ''}" data-a="passo-padrao" data-v="${v}">+${num(v)} kg</button>`).join('')}</div>
    </section>
    <section class="card">
      <div class="row between"><div><b class="h-md" style="font-size:17px">Meta semanal</b><p class="sm mute" style="margin:4px 0 0">Usada na frequência e na sequência do histórico.</p></div></div>
      <div class="stepper mt12" style="grid-template-columns:56px 1fr 56px">
        <button data-a="meta" data-d="-1" aria-label="Diminuir meta">−</button>
        <div class="valor"><b class="num" style="font-size:22px">${c.metaSemanal} treinos/sem</b></div>
        <button data-a="meta" data-d="1" aria-label="Aumentar meta">+</button>
      </div>
      <button class="btn sec mt12" data-a="testar-alerta">${icon('bell-ring', 18)} Testar alerta do timer</button>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Dados e segurança local</h2>
    <section class="card" style="padding:4px 16px">
      <button class="opt" data-a="exportar"><span class="ic-b ok">${icon('upload', 22)}</span><span class="grow"><b>Exportar backup</b><span class="d">Baixa um arquivo .json com treinos e históricos</span></span>${icon('chevron-right', 18)}</button>
      <label class="opt" for="arq-backup" style="cursor:pointer"><span class="ic-b lime">${icon('download', 22)}</span><span class="grow"><b>Importar backup</b><span class="d">Restaura tudo a partir de um arquivo .json</span></span>${icon('chevron-right', 18)}</label>
      <input id="arq-backup" type="file" accept="application/json,.json" data-in="importar" hidden>
      <button class="opt" data-a="apagar"><span class="ic-b" style="color:var(--pes)">${icon('trash-2', 22)}</span><span class="grow"><b style="color:var(--pes)">Apagar todos os dados</b><span class="d">Remove treinos, histórico e ajustes deste aparelho</span></span></button>
    </section>
    <p class="sm mute" style="text-align:center;margin:8px 0 0">${d.ultimoBackup ? `Último backup: ${esc(fmt(d.ultimoBackup, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }))}` : 'Nenhum backup feito ainda. Faça um de vez em quando!'}</p>
  `;
  return { top: '<h1>Ajustes</h1>', html, nav: true };
}

function validarBackup(obj) {
  const dados = obj?.dados ?? obj;
  if (!dados || !Array.isArray(dados.treinos) || !Array.isArray(dados.sessoes)) return null;
  return dados;
}

registrar(
  {
    toggle: (el) => commit((d) => (d.config[el.dataset.k] = !d.config[el.dataset.k])),
    'passo-padrao': (el) => commit((d) => (d.config.passo = Number(el.dataset.v))),
    meta: (el) => commit((d) => (d.config.metaSemanal = limitar(d.config.metaSemanal + Number(el.dataset.d), 1, 7))),
    'testar-alerta': () => {
      timer.destravarAudio();
      timer.alertar({ tipo: 'descanso' });
      toast('Alerta disparado');
    },
    instalar: async () => {
      const ev = ui.instalar;
      if (!ev) return;
      ev.prompt();
      await ev.userChoice;
      ui.instalar = null;
      commit(() => {});
    },
    exportar: () => {
      const d = get();
      const copia = { ...d, timer: null };
      const pacote = { app: 'fit-life', versao: 1, exportadoEm: Date.now(), dados: copia };
      baixar(`fit-life-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(pacote, null, 2), 'application/json');
      commit((db) => (db.ultimoBackup = Date.now()));
      toast('Backup exportado');
    },
    apagar: () =>
      confirmar({
        titulo: 'Apagar todos os dados?',
        texto: 'Treinos, histórico e ajustes deste aparelho serão removidos. Exporte um backup antes se quiser guardar.',
        ok: 'Apagar tudo',
        fn: () => {
          localStorage.removeItem('fitlife:v1');
          location.hash = '#/';
          location.reload();
        },
      }),
  },
  {
    importar: (ds, valor, el) => {
      const arquivo = el.files?.[0];
      el.value = '';
      if (!arquivo) return;
      const leitor = new FileReader();
      leitor.onload = () => {
        try {
          const dados = validarBackup(JSON.parse(String(leitor.result)));
          if (!dados) throw new Error('formato');
          confirmar({
            titulo: 'Restaurar este backup?',
            texto: `Contém ${dados.treinos.length} treino(s) e ${dados.sessoes.length} sessão(ões). Os dados atuais serão substituídos.`,
            ok: 'Restaurar',
            fn: () => {
              substituirTudo({ ...dados, ativa: null, timer: null });
              toast('Backup restaurado');
            },
          });
        } catch {
          toast('Arquivo inválido. Use um backup exportado pelo app.');
        }
      };
      leitor.readAsText(arquivo);
    },
  },
);
