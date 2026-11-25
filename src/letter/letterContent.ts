export interface LetterBlock {
  id: string;
  kind: 'greeting' | 'paragraph' | 'stanza' | 'signature';
  lines: string[];
}

export const LETTER_GREETING = 'Happy birthday kaka Rania cantik 💐';

export const LETTER_SIGNATURE = '#Dew';

export const LETTER_BLOCKS: LetterBlock[] = [
  {
    id: 'greeting',
    kind: 'greeting',
    lines: [LETTER_GREETING],
  },
  {
    id: 'apology-impromptu',
    kind: 'paragraph',
    lines: ['Maaf baru sempat ucapin hehe... Bikin ini dadakan semoga kamu suka'],
  },
  {
    id: 'prayer-health-fortune',
    kind: 'paragraph',
    lines: [
      'Semoga kamu panjang umur, sehat selalu, makin banyak rezeki nya, yang halal dan barokah banyak banyak banyak aminnnnnn',
    ],
  },
  {
    id: 'prayer-wishlist',
    kind: 'paragraph',
    lines: [
      'Semoga semua Wishlist kamu tercapai, semoga menjadi pribadi yg lebih baik lagi, sukses dan bahagia ya kaaaa ☺️',
    ],
  },
  {
    id: 'prayer-partner',
    kind: 'paragraph',
    lines: [
      'Semoga dapat jodoh yang maslahat dunia akhirat, yang ganteng, kaya, royal banget, baik, dan sayang banget sama kamu, ngehargai kamu, dan selalu ngusahain kamu, setia dan pengertian aminnnn aminnnn ya allahhhhhh',
    ],
  },
  {
    id: 'prayer-protection',
    kind: 'paragraph',
    lines: [
      'Semoga juga kamu di jauhkan dari hal hal buruk dan di gantikan dengan selalu datang hal hal baik kepada mu aminnnn',
    ],
  },
  {
    id: 'miss-you-stanza',
    kind: 'stanza',
    lines: [
      'Huhu kangen banget kaaaa 🥺',
      'Aku ga akan pernah lupain kamuuuuu',
      'Aku senang banget pas kita masih suka cerita cerita, maaf kalo selama ini aku banyak salah ya ka sama kamu, pokoknya kalo ada apa apa kamu boleh chatt aku lagi atau telepon aku kalo butuh temen cerita, aku masih di sini',
    ],
  },
  {
    id: 'gratitude-asbrund',
    kind: 'paragraph',
    lines: [
      'Makasih buat semua hal hal yang kita pernah bagi,makasih buat semua obrolan Asbrund, obrolan ga jelas dan curhat random kita,jujur aku ga akan lupa seberapa baik dan menghargai nya kamu, kamu orang baikk ka.... Semoga di manapun kamu berada selalu di lindungi dan di pertemukan dengan orang orang baik lagi aminnnnnn allahumma aminnnnn',
    ],
  },
  {
    id: 'question-daniel-call',
    kind: 'paragraph',
    lines: ['Btw kamu masih suka daniel atau call? 😭'],
  },
  {
    id: 'miss-talking',
    kind: 'paragraph',
    lines: ['Aku kangen kamu ngomong tentang itu orang 😅'],
  },
  {
    id: 'warm-hug',
    kind: 'paragraph',
    lines: ['Peluk jauh kaaaaa, sehat sehat selalu ya, dan jangan lupa istirahat dan makan 😆👍'],
  },
  {
    id: 'closing-birthday',
    kind: 'paragraph',
    lines: ['Sekali lagi happy birthday ya ka raniaaa'],
  },
  {
    id: 'signature',
    kind: 'signature',
    lines: [LETTER_SIGNATURE],
  },
];

export function formatLetterPlainText(blocks: LetterBlock[] = LETTER_BLOCKS): string {
  return blocks.map((block) => block.lines.join('\n')).join('\n\n');
}
