import { get, commit, treinoAtual, novoExercicio, novaSerie, resumoSeries, repsTxt, TIPOS, INTENSIDADES, PRESETS_DESCANSO } from '../data.js';
import { esc, mss, uid, limitar } from '../lib/util.js';
import { icon } from '../lib/icons.js';
import { registrar, ui, confirmar, toast, ir } from '../ui.js';

/* ---------- Entrada rápida: "3x10-12 + drop" ---------- */

export function parseRapida(txt) {
  const m = String(txt)
    .trim()
    .toLowerCase()
    .match(/^(\d+)\s*[x×]\s*(\d+)(?:\s*[-–a]\s*(\d+))?\s*(?:\+\s*(\d+)?\s*(drop|cluster)(?:\s*set)?s?)?$/);
  if (!m) return null;
  const n = Number(m[1]);
  const min = Number(m[2]);
  const max = m[3] ? Number(m[3]) : min;
  const qtd = m[5] ? Number(m[4] ?? 1) : 0;
  if (n < 1 || n > 10 || min < 1 || max < min || max > 100 || qtd > 6) return null;
  const series = [
    ...Array.from({ length: n }, () => novaSerie('normal', min, max)),
    ...Array.from({ length: qtd }, () => novaSerie(m[5], min, max)),
  ];
  const faixa = min === max ? `${min}` : `${min}-${max}`;
  const nome = m[5] === 'drop' ? 'drop set' : 'cluster';
  const texto = `${n} série${n > 1 ? 's' : ''} normai${n > 1 ? 's' : ''} (${faixa} reps)${qtd ? ` + ${qtd} série${qtd > 1 ? 's' : ''} de ${nome} no final` : ''}`;
  return { series, texto };
}

/* ---------- Tela ---------- */

function stepEd(rotulo, k, valor, exId, i = '', suf = '') {
  return `<div class="grow">
    <span class="caps mute" style="display:block;margin-bottom:4px;font-size:10px">${rotulo}</span>
    <div class="stepper-mini">
      <button data-a="ed-num" data-id="${exId}" data-k="${k}" data-i="${i}" data-d="-1" aria-label="Diminuir ${rotulo}">−</button>
      <div class="valor"><b class="num" style="font-size:18px">${valor}${suf}</b></div>
      <button data-a="ed-num" data-id="${exId}" data-k="${k}" data-i="${i}" data-d="1" aria-label="Aumentar ${rotulo}">+</button>
    </div>
  </div>`;
}

function editorExercicio(ex, idx, total) {
  const s0 = ex.series[0] ?? novaSerie();
  const linhas = ex.series
    .map((s, i) => {
      const tecs = ['normal', 'drop', 'cluster']
        .map((k) => `<button class="${s.tipo === k ? 'on' : ''}" data-a="ed-tec" data-id="${ex.id}" data-i="${i}" data-tipo="${k}">${TIPOS[k]}</button>`)
        .join('');
      const params =
        s.tipo === 'drop'
          ? `<div class="params">${stepEd('Degraus', 'degraus', s.degraus, ex.id, i)}</div>`
          : s.tipo === 'cluster'
            ? `<div class="params">${stepEd('Blocos', 'blocos', s.blocos, ex.id, i)}${stepEd('Pausa', 'pausa', s.pausa, ex.id, i, 's')}</div>`
            : '';
      return `<div class="serie-ed">
        <span class="num-b" style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--inset);font-family:var(--f-display);font-weight:700">${i + 1}</span>
        <div class="tecs">${tecs}</div>
        ${params}
      </div>`;
    })
    .join('');

  return `<div class="corpo">
    <label class="lbl caps" for="ed-nome-${ex.id}">Nome do exercício</label>
    <input id="ed-nome-${ex.id}" class="field" data-in="ed-text" data-k="nome" data-id="${ex.id}" value="${esc(ex.nome)}" autocomplete="off">
    <label class="lbl caps" for="ed-grupo-${ex.id}">Grupo muscular (opcional)</label>
    <input id="ed-grupo-${ex.id}" class="field" data-in="ed-text" data-k="grupo" data-id="${ex.id}" value="${esc(ex.grupo)}" placeholder="Ex.: Peitoral maior · Isolador" autocomplete="off">

    <span class="lbl caps">Intensidade prescrita</span>
    <div class="seg">${Object.entries(INTENSIDADES)
      .map(([k, nome]) => `<button class="${ex.intensidade === k ? `on ${k}` : ''}" data-a="ed-int" data-id="${ex.id}" data-v="${k}">${nome}</button>`)
      .join('')}</div>

    <div class="row between"><span class="lbl caps">Pausa / descanso</span><b class="lime num">${mss(ex.descanso)} min</b></div>
    <div class="presets">${PRESETS_DESCANSO.map((s) => `<button class="${ex.descanso === s ? 'on' : ''}" data-a="ed-desc" data-id="${ex.id}" data-v="${s}">${mss(s)}</button>`).join('')}</div>
    <div class="row mt8" style="gap:8px">
      <button class="btn sec sm grow" data-a="ed-desc" data-id="${ex.id}" data-v="${Math.max(15, ex.descanso - 15)}">−15s</button>
      <button class="btn sec sm grow" data-a="ed-desc" data-id="${ex.id}" data-v="${ex.descanso + 15}">+15s</button>
    </div>

    <label class="lbl caps" for="ed-video-${ex.id}">Vídeo demonstrativo (link)</label>
    <input id="ed-video-${ex.id}" class="field" inputmode="url" data-in="ed-text" data-k="video" data-id="${ex.id}" value="${esc(ex.video)}" placeholder="https://youtube.com/…" autocomplete="off">

    <label class="lbl caps" for="ed-nota-${ex.id}">Orientação do personal</label>
    <textarea id="ed-nota-${ex.id}" class="field" data-in="ed-text" data-k="nota" data-id="${ex.id}" placeholder="Ex.: pausa de 1s na transição">${esc(ex.nota)}</textarea>

    <div class="row between" style="margin-top:20px"><b class="h-md" style="font-size:16px">Estrutura de séries</b><span class="caps ok">${ex.series.length} configuradas</span></div>
    <div class="row mt8" style="gap:10px">
      ${stepEd('Séries', 'nSeries', ex.series.length, ex.id)}
      ${stepEd('Reps mín.', 'repsMin', s0.repsMin, ex.id)}
      ${stepEd('Reps máx.', 'repsMax', s0.repsMax, ex.id)}
    </div>
    <div class="mt8">${linhas}</div>
    <div class="resumo-ed"><span>Resumo: ${esc(resumoSeries(ex.series))}</span><b class="num">Descanso ${mss(ex.descanso)}</b></div>

    <div class="row mt16" style="gap:8px">
      <button class="btn sec sm grow" data-a="ed-up" data-id="${ex.id}" ${idx === 0 ? 'disabled' : ''}>${icon('arrow-up', 16)} Subir</button>
      <button class="btn sec sm grow" data-a="ed-down" data-id="${ex.id}" ${idx === total - 1 ? 'disabled' : ''}>${icon('arrow-down', 16)} Descer</button>
      <button class="btn sec sm grow" data-a="ed-dup" data-id="${ex.id}">${icon('copy', 16)} Duplicar</button>
    </div>
    <button class="btn sec danger mt8" data-a="ed-del-ex" data-id="${ex.id}">${icon('trash-2', 18)} Excluir exercício</button>
  </div>`;
}

export function editar() {
  const d = get();
  const treino = treinoAtual();
  const voltar = `<a class="icon-btn" href="#/" aria-label="Voltar">${icon('arrow-left', 24)}</a>`;
  if (!treino) {
    return { top: `${voltar}<h1 class="sub">Editar treino</h1>`, html: `<div class="vazio"><p>Nenhum treino.</p><button class="btn" data-a="novo-treino">Criar treino</button></div>`, nav: false };
  }
  const total = treino.exercicios.length;
  const aberto = treino.exercicios.find((e) => e.id === ui.editEx);
  const previa = ui.rapida ? parseRapida(ui.rapida) : null;

  const lista = treino.exercicios
    .map((ex, idx) => {
      const ab = ex.id === ui.editEx;
      return `<article class="card ed-ex ${ab ? 'aberto' : ''}">
        <button class="cab" data-a="ed-toggle" data-id="${ex.id}" style="width:100%;text-align:left" aria-expanded="${ab}">
          <span class="num-b">${idx + 1}</span>
          <span class="grow"><b class="h-md" style="font-size:17px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(ex.nome)}</b>
          <span class="sm mute">${esc(resumoSeries(ex.series))} · ${INTENSIDADES[ex.intensidade]} · Pausa ${mss(ex.descanso)}</span></span>
          ${icon(ab ? 'chevron-up' : 'chevron-down', 20)}
        </button>
        ${ab ? editorExercicio(ex, idx, total) : ''}
      </article>`;
    })
    .join('');

  const html = `
    <div class="periodos" style="margin-top:8px">
      ${d.treinos.map((t) => `<button class="chip ${t.id === treino.id ? 'on' : ''}" data-a="ed-treino" data-id="${t.id}">${esc(t.nome.split('–')[0].trim())}</button>`).join('')}
      <button class="chip" data-a="novo-treino">${icon('plus', 14)} Novo</button>
    </div>
    <section class="card">
      <span class="caps mute">Identificação do plano</span>
      <input class="field mt8" style="font-family:var(--f-display);font-weight:700;font-size:18px" data-in="treino-nome" value="${esc(treino.nome)}" aria-label="Nome do treino" autocomplete="off">
      <input class="field mt8" data-in="treino-foco" value="${esc(treino.foco)}" placeholder="Foco (ex.: Hipertrofia · Semana 4)" aria-label="Foco do treino" autocomplete="off">
      <p class="sm mute" style="margin:10px 0 0">As alterações são salvas automaticamente.</p>
    </section>
    <section class="card">
      <div class="row" style="gap:8px"><span class="lime">${icon('zap', 18)}</span><span class="caps lime">Entrada rápida</span></div>
      <div class="row mt8" style="gap:8px">
        <input class="field" data-in="rapida" value="${esc(ui.rapida)}" placeholder="3x10-12 + drop" aria-label="Entrada rápida" autocomplete="off" autocapitalize="off">
        <button class="btn sec sm" style="min-height:48px" data-a="ed-aplicar-rapida">Aplicar</button>
      </div>
      <div class="previa ${ui.rapida && !previa ? 'err' : ''}" data-previa>${previaTxt(ui.rapida, previa, aberto)}</div>
      <p class="sm mute" style="margin:8px 0 0">Aplica no exercício aberto abaixo. Exemplos: <b>4x8-10</b> · <b>3x10-12 + drop</b> · <b>3x8 + 2 cluster</b></p>
    </section>
    <div class="row between" style="margin:20px 0 10px"><h2 class="h-lg" style="font-size:22px">Sequência prescrita</h2><span class="badge neutro">${total} ${total === 1 ? 'item' : 'itens'}</span></div>
    ${lista || `<div class="vazio">${icon('dumbbell', 36)}<p>Nenhum exercício ainda.</p></div>`}
    <button class="btn sec" data-a="ed-novo-ex">${icon('plus', 20)} Adicionar novo exercício</button>
    <button class="btn sec danger mt24" data-a="ed-del-treino">${icon('trash-2', 18)} Excluir este treino</button>
  `;
  return { top: `${voltar}<h1 class="sub">Editar treino</h1><a class="btn sm" href="#/">Concluir</a>`, html, nav: false };
}

function previaTxt(txt, previa, aberto) {
  if (!txt) return '';
  if (!previa) return 'Não entendi. Tente algo como 3x10-12 + drop';
  if (!aberto) return `Prévia: ${esc(previa.texto)}. Abra um exercício para aplicar.`;
  return `Prévia: ${esc(previa.texto)}`;
}

/* ---------- Ações ---------- */

const exDe = (id) => treinoAtual()?.exercicios.find((e) => e.id === id);

registrar(
  {
    'ed-toggle': (el) => {
      ui.editEx = ui.editEx === el.dataset.id ? null : el.dataset.id;
      commit(() => {});
    },
    'ed-treino': (el) => {
      ui.editEx = null;
      commit((d) => (d.treinoAtual = el.dataset.id));
    },
    'ed-novo-ex': () => {
      const ex = novoExercicio();
      commit(() => treinoAtual().exercicios.push(ex));
      ui.editEx = ex.id;
      commit(() => {});
      setTimeout(() => document.getElementById(`ed-nome-${ex.id}`)?.select(), 50);
    },
    'ed-del-ex': (el) => {
      const ex = exDe(el.dataset.id);
      confirmar({
        titulo: `Excluir "${ex.nome}"?`,
        texto: 'O histórico já registrado desse exercício continua salvo.',
        ok: 'Excluir exercício',
        fn: () => {
          ui.editEx = null;
          commit(() => {
            const t = treinoAtual();
            t.exercicios = t.exercicios.filter((e) => e.id !== ex.id);
          });
        },
      });
    },
    'ed-up': (el) => mover(el.dataset.id, -1),
    'ed-down': (el) => mover(el.dataset.id, 1),
    'ed-dup': (el) => {
      const t = treinoAtual();
      const i = t.exercicios.findIndex((e) => e.id === el.dataset.id);
      const copia = { ...structuredClone(t.exercicios[i]), id: uid() };
      copia.nome += ' (cópia)';
      commit(() => t.exercicios.splice(i + 1, 0, copia), false);
      ui.editEx = copia.id;
      commit(() => {});
    },
    'ed-int': (el) => commit(() => (exDe(el.dataset.id).intensidade = el.dataset.v)),
    'ed-desc': (el) => commit(() => (exDe(el.dataset.id).descanso = Number(el.dataset.v))),
    'ed-tec': (el) => {
      const s = exDe(el.dataset.id).series[Number(el.dataset.i)];
      commit(() => (s.tipo = el.dataset.tipo));
    },
    'ed-num': (el) => {
      const ex = exDe(el.dataset.id);
      const dir = Number(el.dataset.d);
      const i = el.dataset.i === '' ? null : Number(el.dataset.i);
      commit(() => {
        switch (el.dataset.k) {
          case 'nSeries': {
            if (dir > 0 && ex.series.length < 10) ex.series.push({ ...(ex.series.at(-1) ?? novaSerie()), tipo: 'normal' });
            else if (dir < 0 && ex.series.length > 1) ex.series.pop();
            break;
          }
          case 'repsMin':
            ex.series.forEach((s) => {
              s.repsMin = limitar(s.repsMin + dir, 1, 100);
              if (s.repsMax < s.repsMin) s.repsMax = s.repsMin;
            });
            break;
          case 'repsMax':
            ex.series.forEach((s) => {
              s.repsMax = limitar(s.repsMax + dir, 1, 100);
              if (s.repsMin > s.repsMax) s.repsMin = s.repsMax;
            });
            break;
          case 'degraus':
            ex.series[i].degraus = limitar(ex.series[i].degraus + dir, 2, 6);
            break;
          case 'blocos':
            ex.series[i].blocos = limitar(ex.series[i].blocos + dir, 2, 10);
            break;
          case 'pausa':
            ex.series[i].pausa = limitar(ex.series[i].pausa + dir * 5, 5, 60);
            break;
        }
      });
    },
    'ed-aplicar-rapida': () => {
      const ex = exDe(ui.editEx);
      const p = parseRapida(ui.rapida);
      if (!p) return toast('Entrada inválida. Exemplo: 3x10-12 + drop');
      if (!ex) return toast('Abra um exercício abaixo para aplicar');
      commit(() => {
        ex.series = p.series;
      });
      ui.rapida = '';
      commit(() => {});
      toast('Séries aplicadas');
    },
    'ed-del-treino': () => {
      const t = treinoAtual();
      confirmar({
        titulo: `Excluir "${t.nome}"?`,
        texto: 'O plano será apagado. As sessões já registradas continuam no histórico.',
        ok: 'Excluir treino',
        fn: () => {
          commit((d) => {
            d.treinos = d.treinos.filter((x) => x.id !== t.id);
            d.treinoAtual = d.treinos[0]?.id ?? null;
          }, false);
          ui.editEx = null;
          ir('#/');
          commit(() => {});
        },
      });
    },
  },
  {
    'ed-text': (ds, valor) => {
      const ex = exDe(ds.id);
      if (ex) commit(() => (ex[ds.k] = valor), false);
    },
    'treino-nome': (ds, valor) => commit(() => (treinoAtual().nome = valor), false),
    'treino-foco': (ds, valor) => commit(() => (treinoAtual().foco = valor), false),
    rapida: (ds, valor) => {
      ui.rapida = valor;
      const el = document.querySelector('[data-previa]');
      const p = valor ? parseRapida(valor) : null;
      if (el) {
        el.textContent = previaTxt(valor, p, exDe(ui.editEx)).replace(/&amp;/g, '&');
        el.classList.toggle('err', !!valor && !p);
      }
    },
  },
);

function mover(id, dir) {
  const t = treinoAtual();
  const i = t.exercicios.findIndex((e) => e.id === id);
  const j = i + dir;
  if (j < 0 || j >= t.exercicios.length) return;
  commit(() => {
    [t.exercicios[i], t.exercicios[j]] = [t.exercicios[j], t.exercicios[i]];
  });
}
