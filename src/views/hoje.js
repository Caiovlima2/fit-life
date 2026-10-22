import { get, commit, treinoAtual, iniciarSessao, resumoSeries, resumoSessao, novoTreino } from '../data.js';
import { esc, mss, num, inteiro, fmt, duracao } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, abrirSheet, fecharSheet, toast, ir, ui } from '../ui.js';
import * as timer from '../timer.js';

function badgeIntensidade(i) {
  const nome = { leve: 'Leve', moderada: 'Moderada', pesada: 'Pesada' }[i] ?? i;
  return `<span class="badge ${esc(i)}">${nome}</span>`;
}

function badgesTecnica(ex) {
  const out = [];
  const drops = ex.series.map((s, i) => (s.tipo === 'drop' ? i + 1 : 0)).filter(Boolean);
  const clusters = ex.series.filter((s) => s.tipo === 'cluster').length;
  if (drops.length) out.push(`<span class="badge tec">${icon('layers', 12)} Drop set · Série ${drops.join(', ')}</span>`);
  if (clusters) out.push(`<span class="badge tec">${icon('layers', 12)} Cluster set${clusters > 1 ? ` ×${clusters}` : ''}</span>`);
  return out.join('');
}

export function hoje() {
  const d = get();
  const ativa = d.ativa;
  const treino = ativa ? (d.treinos.find((t) => t.id === ativa.treinoId) ?? treinoAtual()) : treinoAtual();

  if (!treino) {
    return {
      top: '<h1>Treino</h1>',
      html: `<div class="vazio">${icon('dumbbell', 40)}<p>Você ainda não tem nenhum treino.</p><button class="btn" data-a="novo-treino">Criar primeiro treino</button></div>`,
      nav: true,
    };
  }

  const hojeTxt = fmt(Date.now(), { weekday: 'long', day: 'numeric', month: 'long' });
  const total = treino.exercicios.length;
  const feitos = treino.exercicios.filter((ex) => {
    const reg = ativa?.exercicios[ex.id];
    return reg && reg.series.filter((e) => !e.extra).every((e) => e.concluida);
  }).length;
  const pct = total ? Math.round((feitos / total) * 100) : 0;
  const res = ativa ? resumoSessao(ativa) : null;

  const seletor =
    d.treinos.length > 1 || !ativa
      ? `<div class="periodos" style="margin:12px 0 0">
          ${d.treinos
            .map(
              (t) =>
                `<button class="chip ${t.id === treino.id ? 'on' : ''}" ${ativa ? 'disabled style="opacity:.5"' : `data-a="escolher-treino" data-id="${t.id}"`}>${esc(t.nome.split('–')[0].trim())}</button>`,
            )
            .join('')}
          ${ativa ? '' : `<button class="chip" data-a="novo-treino">${icon('plus', 14)} Novo</button>`}
        </div>`
      : '';

  const cartoes = treino.exercicios
    .map((ex, idx) => {
      const reg = ativa?.exercicios[ex.id];
      const concl = reg ? reg.series.filter((e) => e.concluida).length : 0;
      const totalSeries = reg ? reg.series.length : ex.series.length;
      const feito = !!reg && reg.series.filter((e) => !e.extra).every((e) => e.concluida);
      const andamento = !feito && concl > 0;
      const primeiroPend = treino.exercicios.find((x) => {
        const r = ativa?.exercicios[x.id];
        return !(r && r.series.filter((e) => !e.extra).every((e) => e.concluida));
      });
      const destaque = ativa && primeiroPend?.id === ex.id;

      const status = feito
        ? `<span class="stat-ok">${icon('circle-check', 16)} Concluído (${concl}/${totalSeries} séries)</span>`
        : andamento
          ? `<span class="stat-and">Em andamento · ${concl}/${totalSeries} séries</span>`
          : `<span class="stat-pend">PENDENTE</span>`;
      const rotulo = feito ? 'Registro' : andamento ? 'Continuar' : 'Iniciar';
      const video = ex.video
        ? `<a class="vid on" href="${esc(ex.video)}" target="_blank" rel="noopener" aria-label="Ver vídeo de ${esc(ex.nome)}">${icon('circle-play', 24)}</a>`
        : `<button class="vid" data-a="sem-video" aria-label="Sem vídeo cadastrado">${icon('circle-play', 24)}</button>`;

      return `
      <article class="card ex-card ${destaque ? 'hl' : ''}">
        <div class="row between">
          <div class="row wrap grow" style="gap:6px">
            ${badgeIntensidade(ex.intensidade)}
            ${badgesTecnica(ex)}
            <span class="badge neutro">${icon('hourglass', 12)} ${mss(ex.descanso)}</span>
          </div>
          ${video}
        </div>
        <a href="#/exercicio/${ex.id}"><div class="nome">${idx + 1}. ${esc(ex.nome)}</div></a>
        <div class="resumo">${esc(resumoSeries(ex.series))}${ex.grupo ? ` <span class="mute" style="font-weight:400">· ${esc(ex.grupo)}</span>` : ''}</div>
        ${ex.nota ? `<div class="nota">${icon('lightbulb', 16)}<span>${esc(ex.nota)}</span></div>` : ''}
        <div class="ex-foot">
          ${status}
          <a class="btn ${feito || !destaque ? 'sec' : ''} sm" href="#/exercicio/${ex.id}">${rotulo}${feito ? '' : icon('arrow-right', 16)}</a>
        </div>
      </article>`;
    })
    .join('');

  const html = `
    <section class="card hl" style="margin-top:8px">
      <div class="row wrap" style="gap:8px">
        <span class="badge neutro" style="text-transform:uppercase">${icon('calendar', 12)} ${esc(hojeTxt)}</span>
      </div>
      <h2 class="h-lg mt8">${esc(treino.nome)}</h2>
      ${treino.foco ? `<p class="mute" style="margin:4px 0 0">${esc(treino.foco)}</p>` : ''}
      ${seletor}
      <div class="inset mt16" style="padding:12px">
        <div class="row between"><span class="caps mute">Progresso da sessão</span><b class="num">${feitos} / ${total} exercícios <span class="mute">(${pct}%)</span></b></div>
        <div class="bar mt8"><i style="width:${pct}%"></i></div>
      </div>
      ${
        ativa
          ? `<div class="metrics">
              <div class="metric"><span class="caps mute">Duração</span><b data-dur="${ativa.inicio}">${duracao(Date.now() - ativa.inicio)}</b></div>
              <div class="metric"><span class="caps mute">Carga total</span><b>${inteiro(res.volume)} <small class="mute" style="font-size:12px">kg</small></b></div>
            </div>`
          : `<p class="mute sm" style="margin:12px 0 0">Toque em um exercício para começar. O treino é iniciado automaticamente.</p>`
      }
      <div class="row between mt12">
        <a class="link-btn" href="#/editar">${icon('pencil', 14)} Editar treino</a>
      </div>
    </section>
    ${total ? cartoes : `<div class="vazio">${icon('list-checks', 36)}<p>Este treino ainda não tem exercícios.</p><a class="btn" href="#/editar">Adicionar exercícios</a></div>`}
  `;

  const cta = !total
    ? ''
    : ativa
      ? `<button class="btn cta-dock" data-a="finalizar">${icon('circle-check', 20)} FINALIZAR TREINO</button>`
      : `<button class="btn cta-dock" data-a="iniciar">${icon('play', 20)} INICIAR TREINO</button>`;

  return {
    top: `<h1>Treino</h1><span class="tag-ativo ${navigator.onLine ? '' : 'off'}">${navigator.onLine ? 'Pronto' : 'Offline'}</span>`,
    html,
    cta,
    nav: true,
  };
}

function sheetFinalizar() {
  const a = get().ativa;
  const r = resumoSessao(a);
  if (r.series === 0) {
    abrirSheet(`
      <h2 class="h-md">Nenhuma série registrada</h2>
      <p class="mute" style="margin:8px 0 16px">Você ainda não concluiu nenhuma série neste treino. Quer continuar ou descartar a sessão?</p>
      <button class="btn" data-a="fechar">Continuar treinando</button>
      <button class="btn sec danger mt8" data-a="descartar">Descartar sessão</button>`);
    return;
  }
  abrirSheet(`
    <h2 class="h-md">Finalizar treino?</h2>
    <div class="metrics">
      <div class="metric"><span class="caps mute">Duração</span><b>${duracao(r.duracao)}</b></div>
      <div class="metric"><span class="caps mute">Carga total</span><b>${inteiro(r.volume)} kg</b></div>
      <div class="metric"><span class="caps mute">Séries</span><b>${r.series}</b></div>
      <div class="metric"><span class="caps mute">Recordes</span><b class="lime">${r.recordes}</b></div>
    </div>
    <button class="btn mt16" data-a="salvar-treino">Salvar treino</button>
    <button class="btn sec mt8" data-a="fechar">Continuar treinando</button>
    <button class="btn sec danger mt8" data-a="descartar">Descartar sessão</button>`);
}

registrar({
  iniciar: () => {
    commit((d) => iniciarSessao(treinoAtual() ?? d.treinos[0]));
    toast('Treino iniciado. Bom treino!');
  },
  'escolher-treino': (el) => commit((d) => (d.treinoAtual = el.dataset.id)),
  'novo-treino': () => {
    commit((d) => {
      const t = novoTreino(`Treino ${String.fromCharCode(65 + d.treinos.length)}`);
      d.treinos.push(t);
      d.treinoAtual = t.id;
    }, false);
    ui.editEx = null;
    ir('#/editar');
  },
  'sem-video': () => toast('Sem vídeo cadastrado. Adicione o link em Editar treino.'),
  finalizar: sheetFinalizar,
  'salvar-treino': () => {
    timer.dispensar();
    const d = get();
    const a = d.ativa;
    commit((db) => {
      a.fim = Date.now();
      for (const id of Object.keys(a.exercicios)) {
        a.exercicios[id].series = a.exercicios[id].series.filter((e) => e.concluida);
        if (!a.exercicios[id].series.length) delete a.exercicios[id];
      }
      db.sessoes.push(a);
      db.ativa = null;
    }, false);
    fecharSheet();
    toast('Treino salvo no histórico');
    ir(`#/sessao/${a.id}`);
  },
  descartar: () => {
    timer.dispensar();
    commit((d) => (d.ativa = null));
    fecharSheet();
    ir('#/');
    toast('Sessão descartada');
  },
});
