import { describe, it, expect } from 'vitest';
import { montarBackup, validarBackup } from '../src/backup.js';
import { migrar } from '../src/data.js';

describe('backup', () => {
  it('ida e volta preserva treinos e sessões', () => {
    const dados = migrar({ treinos: [{ id: 'a', exercicios: [] }], sessoes: [{ id: 's' }] });
    dados.timer = { fim: 1 };
    const pacote = montarBackup(dados, 123);
    expect(pacote).toMatchObject({ app: 'fit-life', versao: 1, exportadoEm: 123 });
    expect(pacote.dados.timer).toBeNull();
    const lido = validarBackup(JSON.parse(JSON.stringify(pacote)));
    expect(lido.treinos).toEqual(dados.treinos);
    expect(lido.sessoes).toEqual(dados.sessoes);
  });
  it('aceita dados crus e rejeita formatos errados', () => {
    expect(validarBackup({ treinos: [], sessoes: [] })).not.toBeNull();
    expect(validarBackup({ treinos: [] })).toBeNull();
    expect(validarBackup(null)).toBeNull();
    expect(validarBackup('texto')).toBeNull();
  });
});
