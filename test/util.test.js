import { describe, it, expect } from 'vitest';
import { arredonda, lerNumero, mmss, mss, duracao, esc, limitar, chaveDia, inicioDaSemana } from '../src/lib/util.js';

describe('util', () => {
  it('arredonda para o passo', () => {
    expect(arredonda(77.3)).toBe(77.5);
    expect(arredonda(77.3, 2.5)).toBe(77.5);
    expect(arredonda(0)).toBe(0);
  });
  it('lerNumero aceita vírgula e rejeita lixo', () => {
    expect(lerNumero('3,49')).toBe(3.49);
    expect(lerNumero(' 12.5 ')).toBe(12.5);
    expect(lerNumero('')).toBeNull();
    expect(lerNumero(null)).toBeNull();
    expect(lerNumero('abc')).toBeNull();
  });
  it('formata tempos', () => {
    expect(mmss(90)).toBe('01:30');
    expect(mmss(-5)).toBe('00:00');
    expect(mss(90)).toBe('1:30');
    expect(duracao(52 * 60000)).toBe('52m');
    expect(duracao(65 * 60000)).toBe('1h05');
  });
  it('esc neutraliza HTML', () => {
    expect(esc('<img src=x onerror="a">&\'')).toBe('&lt;img src=x onerror=&quot;a&quot;&gt;&amp;&#39;');
    expect(esc(null)).toBe('');
  });
  it('limitar respeita os extremos', () => {
    expect(limitar(5, 1, 3)).toBe(3);
    expect(limitar(-1, 1, 3)).toBe(1);
  });
  it('semana começa no domingo', () => {
    const quarta = new Date(2026, 10, 18, 15, 0).getTime();
    expect(chaveDia(inicioDaSemana(quarta))).toBe('2026-11-15');
  });
});
