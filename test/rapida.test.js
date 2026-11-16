import { describe, it, expect } from 'vitest';
import { parseRapida } from '../src/rapida.js';

const tipos = (r) => r.series.map((s) => s.tipo);

describe('entrada rápida', () => {
  it('séries normais com faixa de reps', () => {
    const r = parseRapida('4x8-10');
    expect(tipos(r)).toEqual(['normal', 'normal', 'normal', 'normal']);
    expect(r.series[0]).toMatchObject({ repsMin: 8, repsMax: 10 });
  });
  it('aceita × e "a"', () => {
    expect(parseRapida('3 × 10 a 12').series[0]).toMatchObject({ repsMin: 10, repsMax: 12 });
  });
  it('técnica na última série', () => {
    expect(tipos(parseRapida('3x10-12 + drop'))).toEqual(['normal', 'normal', 'normal', 'drop']);
    expect(tipos(parseRapida('3x8 + 2 cluster'))).toEqual(['normal', 'normal', 'normal', 'cluster', 'cluster']);
  });
  it.each(['3x10 + rest-pause', '3x10 + rest pause', '3x10 + restpause', '3x10 + rp'])('rest-pause: %s', (txt) => {
    expect(tipos(parseRapida(txt)).at(-1)).toBe('restpause');
  });
  it('séries por tempo', () => {
    const r = parseRapida('3x45s');
    expect(tipos(r)).toEqual(['tempo', 'tempo', 'tempo']);
    expect(r.series[0].segundos).toBe(45);
    expect(parseRapida('2 x 30 seg').series[0].segundos).toBe(30);
  });
  it.each(['', 'abc', '0x10', '11x10', '3x10-5', '3x4s', '3x1000s', '3x10 + 9 drop'])('rejeita: "%s"', (txt) => {
    expect(parseRapida(txt)).toBeNull();
  });
});
