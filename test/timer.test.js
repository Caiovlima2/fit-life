import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as T from '../src/timer.js';
import { get } from '../src/data.js';
import { banco } from './fabrica.js';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(1_000_000);
  banco();
});
afterEach(() => vi.useRealTimers());

describe('timer', () => {
  it('conta a partir do horário de término', () => {
    T.iniciar({ seg: 90 });
    expect(T.restanteSeg()).toBe(90);
    vi.advanceTimersByTime(30_000);
    expect(T.restanteSeg()).toBe(60);
  });
  it('pausa e retoma sem perder tempo', () => {
    T.iniciar({ seg: 60 });
    vi.advanceTimersByTime(20_000);
    T.pausar();
    expect(T.emPausa()).toBe(true);
    vi.advanceTimersByTime(60_000);
    expect(T.restanteSeg()).toBe(40);
    T.retomar();
    vi.advanceTimersByTime(10_000);
    expect(T.restanteSeg()).toBe(30);
  });
  it('somar não deixa o alvo menor que o restante', () => {
    T.iniciar({ seg: 60 });
    T.somar(-15);
    T.somar(-15);
    expect(T.ativo().total).toBeGreaterThanOrEqual(T.restanteSeg());
    expect(T.restanteSeg()).toBe(30);
  });
  it('termina uma vez e avisa', () => {
    T.iniciar({ seg: 5 });
    vi.advanceTimersByTime(6000);
    T.tick();
    expect(T.ativo().terminou).toBe(true);
  });
  it('registra o descanso real na série de origem', () => {
    banco({ ativa: { id: 's', exercicios: { ex: { series: [{ concluida: true }] } } } });
    T.iniciar({ seg: 90, ref: { exId: 'ex', idx: 0 } });
    vi.advanceTimersByTime(75_000);
    T.dispensar();
    expect(T.ativo()).toBeNull();
    expect(get().ativa.exercicios.ex.series[0].descansoReal).toBe(75);
  });
});
