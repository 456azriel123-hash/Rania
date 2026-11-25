import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  LETTER_BLOCKS,
  LETTER_GREETING,
  LETTER_SIGNATURE,
  formatLetterPlainText,
} from './letterContent';
import { MUSIC_TRACK_FILENAME, MUSIC_TRACK_SRC } from './audioConfig';

test('letter greeting and signature match exact requested copy', () => {
  assert.equal(LETTER_GREETING, 'Happy birthday kaka Rania cantik 💐');
  assert.equal(LETTER_SIGNATURE, '#Dew');
  assert.equal(LETTER_BLOCKS[0]?.kind, 'greeting');
  assert.equal(LETTER_BLOCKS[LETTER_BLOCKS.length - 1]?.kind, 'signature');
});

test('plain text letter preserves every requested paragraph verbatim', () => {
  const plain = formatLetterPlainText();
  const expectedSnippets = [
    'Happy birthday kaka Rania cantik 💐',
    'Maaf baru sempat ucapin hehe... Bikin ini dadakan semoga kamu suka',
    'Semoga kamu panjang umur, sehat selalu, makin banyak rezeki nya, yang halal dan barokah banyak banyak banyak aminnnnnn',
    'Semoga semua Wishlist kamu tercapai, semoga menjadi pribadi yg lebih baik lagi, sukses dan bahagia ya kaaaa ☺️',
    'Semoga dapat jodoh yang maslahat dunia akhirat, yang ganteng, kaya, royal banget, baik, dan sayang banget sama kamu, ngehargai kamu, dan selalu ngusahain kamu, setia dan pengertian aminnnn aminnnn ya allahhhhhh',
    'Semoga juga kamu di jauhkan dari hal hal buruk dan di gantikan dengan selalu datang hal hal baik kepada mu aminnnn',
    'Huhu kangen banget kaaaa 🥺\nAku ga akan pernah lupain kamuuuuu\nAku senang banget pas kita masih suka cerita cerita, maaf kalo selama ini aku banyak salah ya ka sama kamu, pokoknya kalo ada apa apa kamu boleh chatt aku lagi atau telepon aku kalo butuh temen cerita, aku masih di sini',
    'Makasih buat semua hal hal yang kita pernah bagi,makasih buat semua obrolan Asbrund, obrolan ga jelas dan curhat random kita,jujur aku ga akan lupa seberapa baik dan menghargai nya kamu, kamu orang baikk ka.... Semoga di manapun kamu berada selalu di lindungi dan di pertemukan dengan orang orang baik lagi aminnnnnn allahumma aminnnnn',
    'Btw kamu masih suka daniel atau call? 😭',
    'Aku kangen kamu ngomong tentang itu orang 😅',
    'Peluk jauh kaaaaa, sehat sehat selalu ya, dan jangan lupa istirahat dan makan 😆👍',
    'Sekali lagi happy birthday ya ka raniaaa',
    '#Dew',
  ];

  for (const snippet of expectedSnippets) {
    assert.ok(plain.includes(snippet), `Missing expected snippet: ${snippet}`);
  }
  assert.equal(plain.includes('nyusahin'), false);
  assert.equal(LETTER_BLOCKS.length, 13);
});

test('music track path points to existing placeholder file in public/music', () => {
  assert.equal(MUSIC_TRACK_FILENAME, 'lagu-ulang-tahun.mp3');
  assert.equal(MUSIC_TRACK_SRC, '/music/lagu-ulang-tahun.mp3');
  const fullPath = path.resolve(process.cwd(), 'public', 'music', MUSIC_TRACK_FILENAME);
  assert.equal(fs.existsSync(fullPath), true);
  assert.ok(fs.statSync(fullPath).size > 100);
});
