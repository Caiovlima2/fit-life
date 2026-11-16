import { describe, it, expect } from 'vitest';
import { lerYoutube, urlEmbed, urlYoutube, urlBuscaYoutube } from '../src/video.js';

const ID = 'dQw4w9WgXcQ';
describe('lerYoutube', () => {
  it.each([
    [`https://www.youtube.com/watch?v=${ID}`, 0],
    [`https://youtu.be/${ID}`, 0],
    [`https://youtu.be/${ID}?si=abc&t=90`, 90],
    [`https://m.youtube.com/watch?v=${ID}&t=1m30s`, 90],
    [`https://www.youtube.com/shorts/${ID}`, 0],
    [`https://www.youtube.com/embed/${ID}`, 0],
    [`https://youtube.com/live/${ID}?t=2m`, 120],
  ])('%s', (url, inicio) => expect(lerYoutube(url)).toEqual({ id: ID, inicio }));

  it.each(['', 'texto', 'https://vimeo.com/123', 'https://youtube.com/watch?v=curto', 'https://youtube.com/'])(
    'rejeita %j',
    (url) => expect(lerYoutube(url)).toBeNull(),
  );
  it('monta as URLs', () => {
    expect(urlEmbed({ id: ID, inicio: 5 })).toContain(`youtube-nocookie.com/embed/${ID}?`);
    expect(urlEmbed({ id: ID, inicio: 5 })).toContain('start=5');
    expect(urlEmbed({ id: ID, inicio: 0 })).not.toContain('start');
    expect(urlYoutube({ id: ID, inicio: 0 })).toBe(`https://youtu.be/${ID}`);
  });

  it('monta a busca com o nome do exercício', () => {
    expect(urlBuscaYoutube('Supino Reto')).toBe(
      'https://www.youtube.com/results?search_query=Supino+Reto+execu%C3%A7%C3%A3o',
    );
  });
});
