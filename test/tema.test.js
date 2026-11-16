import { describe, it, expect } from 'vitest';
import { resolverTema } from '../src/tema.js';
import { conteudo } from '../src/notificacao.js';
import { migrar } from '../src/data.js';

describe('resolverTema', () => {
  it('claro e escuro ignoram o sistema', () => {
    expect(resolverTema('claro', false)).toBe('claro');
    expect(resolverTema('escuro', true)).toBe('escuro');
  });
  it('auto segue o sistema; desconhecido cai no escuro', () => {
    expect(resolverTema('auto', true)).toBe('claro');
    expect(resolverTema('auto', false)).toBe('escuro');
    expect(resolverTema(undefined, true)).toBe('escuro');
  });
  it('migração mantém o escuro e a notificação desligada para dados antigos', () => {
    const d = migrar({ treinos: [], sessoes: [], config: { som: false } });
    expect(d.config).toMatchObject({ tema: 'escuro', notificacao: false, som: false });
  });
});

describe('conteudo da notificação', () => {
  it('descanso usa o texto da próxima série', () => {
    expect(conteudo({ tipo: 'descanso', proxima: { texto: 'Série 3 · 80 kg × 8' } })).toEqual({
      titulo: 'Descanso terminou',
      corpo: 'Série 3 · 80 kg × 8',
    });
  });
  it('textos padrão sem próxima', () => {
    expect(conteudo({ tipo: 'descanso' }).corpo).toBe('Hora da próxima série.');
    expect(conteudo({ tipo: 'pausa' }).titulo).toBe('Pausa terminou');
    expect(conteudo({ tipo: 'tempo' }).titulo).toBe('Tempo acabou');
  });
});
