import { describe, it, expect } from 'vitest';
import { sugerirMusculo, MUSCULOS } from '../src/musculos.js';
import { volumeSemana, historicoGrupo, situacao, inicioSemana } from '../src/volume.js';
import { recordes } from '../src/recordes.js';
import { migrar } from '../src/data.js';
import { normal, drop, cluster, feita, sessao, reg } from './fabrica.js';

// Domingo 8 nov 2026 12:00 = início de semana (local) + folga
const DOM = new Date(2026, 10, 8, 12).getTime();
const DIA = 86400000;
const AGORA = new Date(2026, 10, 15, 16).getTime(); // domingo 15 nov
const mus = (id) => ({ sup: 'peito', rem: 'costas' })[id] ?? 'outro';

describe('sugerirMusculo', () => {
  it.each([
    ['Supino Reto com Barra', 'peito'],
    ['Puxada Aberta Barra Reta', 'costas'],
    ['Agachamento Livre', 'pernas'],
    ['Mesa Flexora', 'pernas'],
    ['Desenvolvimento Militar', 'ombros'],
    ['Crucifixo Inverso', 'ombros'],
    ['Rosca Direta', 'biceps'],
    ['Tríceps Testa', 'triceps'],
    ['Paralelas (Dips) com Carga', 'triceps'],
    ['Panturrilha em Pé', 'panturrilha'],
    ['Elevação Pélvica', 'gluteos'],
    ['Prancha', 'abdomen'],
    ['Alongamento qualquer', ''],
  ])('%s -> %s', (nome, esperado) => expect(sugerirMusculo(nome)).toBe(esperado));

  it('só devolve chaves válidas', () => {
    const chaves = MUSCULOS.map(([k]) => k);
    for (const n of ['Supino', 'Remada', 'Leg Press', 'Rosca', 'Abdominal'])
      expect(chaves).toContain(sugerirMusculo(n));
  });
});

describe('volumeSemana', () => {
  const aq = feita('normal', [{ carga: 20, reps: 12, ok: true }], { aquecimento: true });
  const s1 = sessao('a', DOM + DIA, { sup: reg(aq, normal(80), normal(80), drop(60, 50)), rem: reg(normal(50)) });
  const fora = sessao('b', DOM - 2 * DIA, { sup: reg(normal(80)) });

  it('conta só séries de trabalho da semana (drop = 1) e ignora aquecimento', () => {
    const v = volumeSemana([s1, fora], inicioSemana(0, AGORA) - 7 * DIA, mus);
    expect(v.total).toBe(4);
    expect(v.grupos.peito.series).toBe(3);
    expect(v.grupos.costas.series).toBe(1);
  });
  it('séries não concluídas e exercícios desconhecidos', () => {
    const nc = { ...normal(80), concluida: false };
    const s = sessao('c', DOM, { x: reg(nc, normal(10)) });
    const v = volumeSemana([s], inicioSemana(0, AGORA) - 7 * DIA, mus);
    expect(v.grupos.outro.series).toBe(1);
  });
  it('cluster conta como 1', () => {
    const s = sessao('d', DOM, { sup: reg(cluster(60, 3, 3, 3)) });
    expect(volumeSemana([s], inicioSemana(0, AGORA) - 7 * DIA, mus).total).toBe(1);
  });
  it('historicoGrupo devolve as últimas n semanas, atual por último', () => {
    const h = historicoGrupo([s1, fora], 'peito', 3, mus, AGORA - 7 * DIA);
    expect(h.map((x) => x.series)).toEqual([0, 1, 3]);
  });
});

describe('situacao', () => {
  it('compara com a faixa', () => {
    expect(situacao(7, 10, 20)).toBe('abaixo');
    expect(situacao(10, 10, 20)).toBe('faixa');
    expect(situacao(20, 10, 20)).toBe('faixa');
    expect(situacao(21, 10, 20)).toBe('acima');
  });
});

describe('recordes', () => {
  it('1ª sessão só estabelece a marca; recorde batido gera delta', () => {
    const a = sessao('1', AGORA - 20 * DIA, { sup: reg(normal(80, 8)) });
    const b = sessao('2', AGORA - 2 * DIA, { sup: reg(normal(85, 8)) });
    const r = recordes([b, a], AGORA);
    expect(r.itens).toHaveLength(1);
    expect(r.itens[0]).toMatchObject({ carga: 85, reps: 8, delta: 5, novo: true });
    expect(r.batidos30).toBe(1);
    expect(r.recente.id).toBe('sup');
  });
  it('ignora aquecimento, cluster e não concluídas', () => {
    const aq = feita('normal', [{ carga: 200, reps: 10, ok: true }], { aquecimento: true });
    const nc = { ...normal(300), concluida: false };
    const s = sessao('1', AGORA - DIA, { sup: reg(aq, nc, cluster(150, 3, 3), normal(60, 10)) });
    expect(recordes([s], AGORA).itens[0]).toMatchObject({ carga: 60, delta: null, novo: false, batido: false });
  });
  it('sem histórico', () => expect(recordes([], AGORA)).toMatchObject({ itens: [], batidos30: 0, recente: null }));
});

describe('migração do grupo muscular', () => {
  it('sugere pelo nome sem apagar a descrição, e respeita o que já existe', () => {
    const ex = (id, nome, extra = {}) => ({ id, nome, grupo: 'texto livre', series: [], ...extra });
    const d = migrar({
      treinos: [
        {
          id: 't',
          nome: 'T',
          foco: '',
          exercicios: [ex('a', 'Supino Reto'), ex('b', 'Supino', { musculo: 'ombros' }), ex('c', 'Coisa')],
        },
      ],
    });
    const [a, b, c] = d.treinos[0].exercicios;
    expect([a.musculo, b.musculo, c.musculo]).toEqual(['peito', 'ombros', '']);
    expect(a.grupo).toBe('texto livre');
    expect(d.config).toMatchObject({ volMin: 10, volMax: 20 });
  });
});
