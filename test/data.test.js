import { describe, it, expect, beforeEach } from 'vitest';
import * as D from '../src/data.js';
import { banco, plano, normal, drop, cluster, feita, sessao, reg } from './fabrica.js';

const fmtNum = (n) => String(n);

beforeEach(() => {
  banco();
});

describe('cálculos', () => {
  it('1RM (Epley)', () => {
    expect(D.rm1(100, 1)).toBe(100);
    expect(D.rm1(100, 10)).toBeCloseTo(133.33, 1);
  });
  it('topoCarga: cluster usa a carga da série, drop o 1º degrau', () => {
    expect(D.topoCarga(cluster(40, 3, 3))).toBe(40);
    expect(D.topoCarga(drop(80, 60, 40))).toBe(80);
    expect(D.topoCarga(normal(70))).toBe(70);
  });
  it('volume conta só partes marcadas', () => {
    const e = drop(80, 60);
    e.partes[1].ok = false;
    expect(D.volumeSerie(e)).toBe(80 * 8);
    expect(D.volumeSerie(cluster(40, 3, 3, 2))).toBe(40 * 8);
  });
  it('volume da sessão soma todos os exercícios', () => {
    const s = sessao('s', 1, { a: reg(normal(100, 5)), b: reg(normal(10, 10)) });
    expect(D.volumeSessao(s)).toBe(600);
  });
});

describe('textos', () => {
  it('resumoSeries agrupa séries iguais', () => {
    const s = [plano(), plano(), plano(), plano('drop')];
    expect(D.resumoSeries(s.map((x) => ({ ...x, repsMin: 10, repsMax: 12 })))).toBe('3 × 10-12 + 1 drop');
    expect(D.resumoSeries([plano('cluster'), plano('cluster')])).toBe('2 cluster');
  });
  it('repsTxt', () => {
    expect(D.repsTxt({ repsMin: 8, repsMax: 8 })).toBe('8');
    expect(D.repsTxt({ repsMin: 8, repsMax: 12 })).toBe('8-12');
  });
  it('textoSerie por técnica', () => {
    expect(D.textoSerie(normal(80, 8), fmtNum)).toBe('80 kg × 8');
    expect(D.textoSerie(drop(80, 60), fmtNum)).toBe('80×8 ▸ 60×8');
    expect(D.textoSerie(cluster(40, 3, 3, 2), fmtNum)).toBe('40 kg · 3+3+2');
    expect(D.textoSerie(null, fmtNum)).toBe('—');
  });
});

describe('migrar (compatibilidade com dados antigos)', () => {
  it('completa campos que faltam sem apagar nada', () => {
    const antigo = {
      treinos: [{ id: 'x', nome: 'N', exercicios: [] }],
      sessoes: [{ id: 's' }],
      config: { som: false },
    };
    const d = D.migrar(antigo);
    expect(d.config).toMatchObject({ som: false, vibracao: true, passo: 2.5, metaSemanal: 4 });
    expect(d.sessoes).toHaveLength(1);
    expect(d.treinos[0].id).toBe('x');
    expect(d.treinoAtual).toBe('x');
    expect(d.ativa).toBeNull();
    expect(d.timer).toBeNull();
    expect(d.ultimoBackup).toBeNull();
  });
  it('lida com estruturas inválidas', () => {
    const d = D.migrar({ treinos: 'lixo', sessoes: null });
    expect(Array.isArray(d.treinos)).toBe(true);
    expect(d.sessoes).toEqual([]);
  });
  it('corrige treinoAtual que não existe mais', () => {
    const d = D.migrar({ treinos: [{ id: 'a', exercicios: [] }], sessoes: [], treinoAtual: 'fantasma' });
    expect(d.treinoAtual).toBe('a');
  });
  it('é idempotente', () => {
    const uma = D.migrar({ treinos: [{ id: 'a', exercicios: [] }], sessoes: [] });
    const duas = D.migrar(JSON.parse(JSON.stringify(uma)));
    expect(duas).toEqual(uma);
  });
});

describe('criarEntrada', () => {
  it('sem histórico: carga 0, reps no máximo da faixa, marcada como palpite', () => {
    const e = D.criarEntrada(plano('normal', 8, 10), null);
    expect(e).toMatchObject({ tipo: 'normal', concluida: false, auto: true });
    expect(e.partes).toEqual([{ carga: 0, reps: 10, ok: false }]);
  });
  it('com histórico: repete carga e reps da última vez', () => {
    const e = D.criarEntrada(plano(), normal(80, 9));
    expect(e.partes[0]).toEqual({ carga: 80, reps: 9, ok: false });
    expect(e.auto).toBe(false);
  });
  it('drop novo: degraus caem 20% a partir do topo', () => {
    const e = D.criarEntrada({ ...plano('drop'), degraus: 3 }, normal(100));
    expect(e.partes.map((p) => p.carga)).toEqual([100, 80, 64]);
  });
  it('drop com histórico de drop reaproveita os degraus', () => {
    const e = D.criarEntrada(plano('drop'), drop(80, 50));
    expect(e.partes.map((p) => p.carga)).toEqual([80, 50]);
  });
  it('cluster: usa blocos do plano e carga única', () => {
    const e = D.criarEntrada({ ...plano('cluster'), blocos: 3, pausa: 20 }, normal(40));
    expect(e).toMatchObject({ carga: 40, pausa: 20 });
    expect(e.partes).toHaveLength(3);
  });
});

describe('converterEntrada / adicionarDegrau', () => {
  it('troca a técnica mantendo carga e faixa de reps', () => {
    const e = D.converterEntrada(D.criarEntrada(plano(), normal(80, 9)), 'drop');
    expect(e.tipo).toBe('drop');
    expect(e.partes[0].carga).toBe(80);
    expect(e.auto).toBe(false);
  });
  it('mesma técnica devolve a mesma entrada', () => {
    const e = D.criarEntrada(plano(), null);
    expect(D.converterEntrada(e, 'normal')).toBe(e);
  });
  it('adicionarDegrau reduz 20% e arredonda a 0,5 kg', () => {
    const e = drop(75);
    D.adicionarDegrau(e);
    expect(e.partes.at(-1).carga).toBe(60);
  });
});

describe('recordes (atualizarConclusao)', () => {
  const montar = (anterior, atual) => {
    const hist = sessao('antes', 1000, { ex: reg(...anterior) });
    banco({ sessoes: [hist] });
    const s = sessao('agora', 5000, { ex: reg(atual) });
    s.fim = null;
    return s;
  };

  it('carga maior que todo o histórico é recorde', () => {
    const s = montar([normal(80)], normal(82.5));
    D.atualizarConclusao(s, 'ex', 0);
    expect(s.exercicios.ex.series[0].recorde).toBe(true);
  });
  it('igualar não é recorde', () => {
    const s = montar([normal(80)], normal(80));
    D.atualizarConclusao(s, 'ex', 0);
    expect(s.exercicios.ex.series[0].recorde).toBe(false);
  });
  it('primeira vez do exercício nunca é recorde', () => {
    banco();
    const s = sessao('agora', 5000, { ex: reg(normal(50)) });
    D.atualizarConclusao(s, 'ex', 0);
    expect(s.exercicios.ex.series[0].recorde).toBe(false);
  });
  it('técnicas diferentes não se comparam', () => {
    const s = montar([normal(100)], drop(60, 40));
    D.atualizarConclusao(s, 'ex', 0);
    expect(s.exercicios.ex.series[0].recorde).toBe(false);
  });
  it('série desmarcada perde concluída e recorde', () => {
    const s = montar([normal(80)], normal(90));
    D.atualizarConclusao(s, 'ex', 0);
    s.exercicios.ex.series[0].partes[0].ok = false;
    D.atualizarConclusao(s, 'ex', 0);
    expect(s.exercicios.ex.series[0]).toMatchObject({ concluida: false, recorde: false });
  });
  it('compara também com séries já feitas na mesma sessão', () => {
    const s = montar([normal(80)], normal(90));
    s.exercicios.ex.series.push(normal(85));
    D.atualizarConclusao(s, 'ex', 1);
    expect(s.exercicios.ex.series[1].recorde).toBe(false);
  });
});

describe('propagarCarga', () => {
  it('passa a carga para a próxima série ainda sem histórico', () => {
    const r = reg(normal(80), D.criarEntrada(plano(), null));
    D.propagarCarga(r, 0);
    expect(r.series[1].partes[0].carga).toBe(80);
  });
  it('não mexe em série com histórico ou já concluída', () => {
    const r = reg(normal(80), { ...D.criarEntrada(plano(), normal(70)), auto: false });
    D.propagarCarga(r, 0);
    expect(r.series[1].partes[0].carga).toBe(70);
  });
});

describe('sessões e histórico', () => {
  it('sessaoAnterior ignora sessões sem série concluída e respeita antesDe', () => {
    const vazia = feita('normal', [{ carga: 1, reps: 1, ok: false }], { concluida: false });
    banco({
      sessoes: [
        sessao('a', 1000, { ex: reg(normal(60)) }),
        sessao('b', 2000, { ex: reg(normal(70)) }),
        sessao('c', 3000, { ex: reg(vazia) }),
      ],
    });
    expect(D.sessaoAnterior('ex').sessao.id).toBe('b');
    expect(D.sessaoAnterior('ex', 2000).sessao.id).toBe('a');
    expect(D.sessaoAnterior('outro')).toBeNull();
  });
  it('resumoSessao conta séries, recordes e exercícios feitos', () => {
    const s = sessao('s', 1, { a: reg(normal(1), { ...normal(2), recorde: true }), b: reg() });
    expect(D.resumoSessao(s)).toMatchObject({ series: 2, recordes: 1, feitos: 1 });
    expect(D.ehSessaoFeita(s)).toBe(true);
  });
  it('pontosCarga usa a maior carga de séries normais/drop por sessão', () => {
    banco({
      sessoes: [
        sessao('a', 1000, { ex: reg(normal(60), normal(70), cluster(100, 3)) }),
        sessao('b', 2000, { ex: reg(cluster(100, 3)) }),
      ],
    });
    expect(D.pontosCarga('ex').map((p) => p.carga)).toEqual([70]);
  });
  it('exerciciosComHistorico lista só o que foi concluído', () => {
    banco({ sessoes: [sessao('a', 1, { ex: reg(normal(60)) })] });
    expect(D.exerciciosComHistorico()).toEqual([{ id: 'ex', nome: 'Supino' }]);
  });
  it('garantirExercicio cria séries a partir do plano e do histórico', () => {
    const ex = { ...D.novoExercicio('Supino'), id: 'ex' };
    banco({ sessoes: [sessao('a', 1000, { ex: reg(normal(80, 9), normal(80, 8), normal(75, 8)) })] });
    const s = D.iniciarSessao({ id: 't1', nome: 'T' });
    const r = D.garantirExercicio(s, ex);
    expect(r.series.map((e) => e.partes[0].carga)).toEqual([80, 80, 75]);
    expect(D.garantirExercicio(s, ex)).toBe(r);
  });
});

describe('persistência', () => {
  it('commit salva e carregar restaura', () => {
    D.commit((d) => (d.config.passo = 5), false);
    expect(D.carregar().config.passo).toBe(5);
  });
  it('dados ilegíveis não derrubam o app', () => {
    localStorage.setItem(D.CHAVE, '{quebrado');
    expect(D.carregar().treinos.length).toBeGreaterThan(0);
  });
});

describe('Fase 1: rest-pause, tempo, aquecimento, drop e RPE', () => {
  const restpause = (carga, ...reps) =>
    feita(
      'restpause',
      reps.map((r) => ({ reps: r, ok: true })),
      { carga },
    );
  const tempo = (segundos, carga = 0) => feita('tempo', [{ carga, reps: 0, segundos, ok: true }]);

  it('rest-pause usa carga única e blocos como o cluster', () => {
    expect(D.topoCarga(restpause(45, 10, 4, 2))).toBe(45);
    expect(D.volumeSerie(restpause(45, 10, 4, 2))).toBe(45 * 16);
    expect(D.textoSerie(restpause(45, 10, 4, 2), fmtNum)).toBe('45 kg · 10+4+2');
    const e = D.criarEntrada({ ...plano('restpause'), blocos: 3, pausa: 15 }, normal(45));
    expect(e).toMatchObject({ tipo: 'restpause', carga: 45, pausa: 15 });
    expect(e.partes).toHaveLength(3);
  });

  it('rest-pause lembra os blocos da última vez', () => {
    const e = D.criarEntrada(plano('restpause'), restpause(45, 10, 4));
    expect(e.partes.map((p) => p.reps)).toEqual([10, 4]);
  });

  it('série por tempo: alvo em segundos, sem volume, peso extra opcional', () => {
    const e = D.criarEntrada({ ...plano('tempo'), segundos: 45 }, null);
    expect(e.partes[0]).toEqual({ carga: 0, reps: 0, segundos: 45, ok: false });
    expect(D.volumeSerie(tempo(45, 10))).toBe(0);
    expect(D.textoSerie(tempo(45), fmtNum)).toBe('45 s');
    expect(D.textoSerie(tempo(45, 10), fmtNum)).toBe('45 s · +10 kg');
  });

  it('tempo repete os segundos da última vez e não herda carga de série normal', () => {
    expect(D.criarEntrada(plano('tempo'), tempo(60)).partes[0].segundos).toBe(60);
    expect(D.criarEntrada(plano('tempo'), normal(80)).partes[0].carga).toBe(0);
  });

  it('resumoSeries descreve as técnicas novas', () => {
    const s = [{ ...plano('tempo'), segundos: 30 }, { ...plano('tempo'), segundos: 30 }, plano('restpause')];
    expect(D.resumoSeries(s)).toBe('2 × 30 s + 1 rest-pause');
  });

  describe('drop com redução por série', () => {
    it('usa a redução do plano', () => {
      const e = D.criarEntrada({ ...plano('drop'), degraus: 3, reducao: 0.3 }, normal(40));
      expect(e.reducao).toBe(0.3);
      expect(e.partes.map((p) => p.carga)).toEqual([40, 28, 19.5]);
    });
    it('a escolha da última sessão vence a do plano', () => {
      const prev = { ...drop(40, 20), reducao: 0.5 };
      expect(D.criarEntrada({ ...plano('drop'), reducao: 0.2 }, prev).reducao).toBe(0.5);
    });
    it('recalcularDrop mexe só nos degraus ainda não feitos', () => {
      const e = D.criarEntrada({ ...plano('drop'), degraus: 3 }, normal(40));
      e.partes[1].ok = true;
      D.recalcularDrop(e, 0.4);
      expect(e.reducao).toBe(0.4);
      expect(e.partes[1].carga).toBe(32); // já feito: preservado
      expect(e.partes[2].carga).toBe(19); // 32 × 0,6 = 19,2 → 19
    });
    it('adicionarDegrau respeita a redução da série', () => {
      const e = { ...drop(40, 28), reducao: 0.3 };
      D.adicionarDegrau(e);
      expect(e.partes.at(-1).carga).toBe(19.5);
    });
  });

  describe('aquecimento', () => {
    it('não conta em volume, recordes, progresso nem resumo', () => {
      const aq = { ...normal(40, 12), aquecimento: true };
      expect(D.volumeSerie(aq)).toBe(0);
      banco({ sessoes: [sessao('a', 1000, { ex: reg(aq, normal(80)) })] });
      expect(D.pontosCarga('ex').map((p) => p.carga)).toEqual([80]);
      expect(D.resumoSessao(sessao('s', 1, { ex: reg(aq, normal(80)) })).series).toBe(1);
    });
    it('sessão só com aquecimento não vira "anterior" nem aparece no histórico de progresso', () => {
      const aq = { ...normal(40, 12), aquecimento: true };
      banco({ sessoes: [sessao('a', 1000, { ex: reg(aq) })] });
      expect(D.sessaoAnterior('ex')).toBeNull();
      expect(D.exerciciosComHistorico()).toEqual([]);
    });
    it('aquecimento nunca é recorde e não bloqueia o recorde das séries de trabalho', () => {
      banco({ sessoes: [sessao('antes', 1000, { ex: reg({ ...normal(200, 1), aquecimento: true }, normal(80)) })] });
      const s = sessao('agora', 5000, { ex: reg({ ...normal(300, 1), aquecimento: true }, normal(85)) });
      D.atualizarConclusao(s, 'ex', 0);
      D.atualizarConclusao(s, 'ex', 1);
      expect(s.exercicios.ex.series[0].recorde).toBe(false);
      expect(s.exercicios.ex.series[1].recorde).toBe(true);
    });
    it('adicionarAquecimento sugere frações da primeira série de trabalho', () => {
      const r = reg(normal(80));
      expect(D.adicionarAquecimento(r)).toBe(0);
      expect(r.series[0]).toMatchObject({ aquecimento: true, extra: true, concluida: false });
      expect(r.series[0].partes[0]).toMatchObject({ carga: 40, reps: 12 });
      D.adicionarAquecimento(r);
      expect(r.series.map((e) => e.aquecimento)).toEqual([true, true, undefined]);
      expect(r.series[1].partes[0]).toMatchObject({ carga: 60, reps: 6 });
    });
    it('adicionarAquecimento reaproveita o da sessão anterior', () => {
      const anterior = reg({ ...normal(50, 10), aquecimento: true, extra: true }, normal(80));
      const r = reg(normal(80));
      D.adicionarAquecimento(r, anterior);
      expect(r.series[0].partes[0]).toMatchObject({ carga: 50, reps: 10 });
      expect(r.series[0].auto).toBe(false);
    });
    it('série do plano marcada como aquecimento é lembrada na sessão seguinte, sem deslocar as outras', () => {
      const ex = { ...D.novoExercicio('Supino'), id: 'ex' };
      const antes = reg({ ...normal(40, 12), aquecimento: true }, normal(80, 9), normal(80, 8));
      antes.series.unshift({ ...normal(20, 15), aquecimento: true, extra: true }); // inserido na hora
      banco({ sessoes: [sessao('a', 1000, { ex: antes })] });
      const s = D.iniciarSessao({ id: 't1', nome: 'T' });
      const r = D.garantirExercicio(s, ex);
      expect(r.series.map((e) => !!e.aquecimento)).toEqual([true, false, false]);
      expect(r.series.map((e) => e.partes[0].carga)).toEqual([40, 80, 80]);
    });
    it('propagarCarga ignora aquecimento', () => {
      const r = reg({ ...normal(40, 12), aquecimento: true }, D.criarEntrada(plano(), null));
      D.propagarCarga(r, 0);
      expect(r.series[1].partes[0].carga).toBe(0);
    });
    it('converterEntrada preserva a marca de aquecimento', () => {
      const e = D.converterEntrada({ ...D.criarEntrada(plano(), normal(40)), aquecimento: true }, 'drop');
      expect(e.aquecimento).toBe(true);
    });
  });

  it('converter para tempo zera a carga (não é peso extra)', () => {
    const e = D.converterEntrada(D.criarEntrada(plano(), normal(80)), 'tempo');
    expect(e.partes[0]).toMatchObject({ carga: 0, segundos: 45 });
  });

  it('dados antigos (sem os campos novos) continuam funcionando', () => {
    const velha = {
      tipo: 'drop',
      repsMin: 8,
      repsMax: 10,
      partes: [
        { carga: 40, reps: 8, ok: true },
        { carga: 32, reps: 8, ok: true },
      ],
      concluida: true,
    };
    expect(D.volumeSerie(velha)).toBe(40 * 8 + 32 * 8);
    D.adicionarDegrau(velha);
    expect(velha.partes.at(-1).carga).toBe(25.5);
    expect(D.migrar({ treinos: [], sessoes: [], config: {} }).config.rpe).toBe(true);
  });
});

describe('rotuloSerie', () => {
  it('numera aquecimentos e séries de trabalho separadamente', () => {
    const series = [{ aquecimento: true }, { aquecimento: true }, {}, {}];
    expect([0, 1, 2, 3].map((i) => D.rotuloSerie(series, i))).toEqual(['Aquec. 1', 'Aquec. 2', 'Série 1', 'Série 2']);
  });
});

describe('sugestão de carga', () => {
  const ant = (carga, reps, extra = {}) => ({ ...normal(carga, reps), ...extra });

  it('sugere subir o passo quando bateu o máximo da faixa', () => {
    expect(D.sugerirCarga(ant(80, 10), 10, 2.5)).toEqual({ carga: 82.5, de: 80, reps: 10 });
    expect(D.sugerirCarga(ant(80, 12), 10, 2.5)?.carga).toBe(82.5);
  });
  it('não sugere se ficou abaixo do máximo', () => {
    expect(D.sugerirCarga(ant(80, 9), 10, 2.5)).toBeNull();
  });
  it('RPE 9 ou 10 segura a sugestão; 8 não', () => {
    expect(D.sugerirCarga(ant(80, 10, { rpe: 9 }), 10, 2.5)).toBeNull();
    expect(D.sugerirCarga(ant(80, 10, { rpe: 10 }), 10, 2.5)).toBeNull();
    expect(D.sugerirCarga(ant(80, 10, { rpe: 8 }), 10, 2.5)).not.toBeNull();
  });
  it('ignora aquecimento, série incompleta, sem carga e outras técnicas', () => {
    expect(D.sugerirCarga(ant(40, 12, { aquecimento: true }), 10, 2.5)).toBeNull();
    expect(D.sugerirCarga(ant(80, 10, { concluida: false }), 10, 2.5)).toBeNull();
    expect(D.sugerirCarga(ant(0, 10), 10, 2.5)).toBeNull();
    expect(D.sugerirCarga(drop(80, 60), 10, 2.5)).toBeNull();
    expect(D.sugerirCarga(null, 10, 2.5)).toBeNull();
  });

  describe('ao montar a sessão', () => {
    const ex = () => ({ ...D.novoExercicio('Supino'), id: 'ex' }); // 3 séries 10-12
    const iniciar = (anterior) => {
      banco({ sessoes: [sessao('a', 1000, { ex: reg(...anterior) })] });
      return D.garantirExercicio(D.iniciarSessao({ id: 't1', nome: 'T' }), ex());
    };

    it('aplica a sugestão só nas séries que bateram o máximo', () => {
      const r = iniciar([normal(80, 12), normal(80, 10), normal(75, 12)]);
      expect(r.series.map((e) => e.partes[0].carga)).toEqual([82.5, 80, 77.5]);
      expect(r.series[0].sugestao).toEqual({ de: 80, reps: 12 });
      expect(r.series[1].sugestao).toBeUndefined();
    });
    it('respeita o passo configurado', () => {
      banco({ sessoes: [sessao('a', 1000, { ex: reg(normal(80, 12)) })], config: { passo: 5 } });
      const r = D.garantirExercicio(D.iniciarSessao({ id: 't1', nome: 'T' }), ex());
      expect(r.series[0].partes[0].carga).toBe(85);
    });
    it('pode ser desligada nos ajustes', () => {
      banco({ sessoes: [sessao('a', 1000, { ex: reg(normal(80, 12)) })], config: { sugestaoCarga: false } });
      const r = D.garantirExercicio(D.iniciarSessao({ id: 't1', nome: 'T' }), ex());
      expect(r.series[0].partes[0].carga).toBe(80);
      expect(r.series[0].sugestao).toBeUndefined();
    });
    it('não sugere em série marcada como aquecimento', () => {
      const r = iniciar([{ ...normal(40, 12), aquecimento: true }, normal(80, 10), normal(80, 10)]);
      expect(r.series[0].partes[0].carga).toBe(40);
      expect(r.series[0].sugestao).toBeUndefined();
    });
  });
});
