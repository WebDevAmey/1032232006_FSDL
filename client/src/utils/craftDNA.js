const STORAGE_KEY = 'craftDNA';
const LEGACY_STORAGE_KEY = 'kg_dna';

export const CRAFT_DNA_QUESTIONS = [
  {
    id: 'q1',
    text: 'What kind of handmade object do you notice first?',
    options: [
      { id: 'a', label: 'Raw clay, wood, and earthy textures', points: { earthy: 2, eco: 1 } },
      { id: 'b', label: 'Festive colour, shine, and statement pieces', points: { festive: 2, heritage: 1 } },
      { id: 'c', label: 'Quiet, clean pieces that feel timeless', points: { minimalist: 2, modern: 1 } },
      { id: 'd', label: 'Craft with visible history and tradition', points: { heritage: 2, earthy: 1 } },
    ],
  },
  {
    id: 'q2',
    text: 'You are choosing a gift for someone special. You pick:',
    options: [
      { id: 'a', label: 'A hand-thrown mug or ceramic bowl', points: { earthy: 2, minimalist: 1 } },
      { id: 'b', label: 'A festive jewellery piece or candle set', points: { festive: 2, modern: 1 } },
      { id: 'c', label: 'A woven textile with craft detail', points: { heritage: 2, eco: 1 } },
      { id: 'd', label: 'A sleek handmade object with clean design', points: { modern: 2, minimalist: 1 } },
    ],
  },
  {
    id: 'q3',
    text: 'Which studio story feels most like you?',
    options: [
      { id: 'a', label: 'A home studio using natural materials and slow craft', points: { eco: 2, earthy: 1 } },
      { id: 'b', label: 'A vibrant maker brand preparing for festive orders', points: { festive: 2, heritage: 1 } },
      { id: 'c', label: 'A family craft tradition passed through generations', points: { heritage: 2, eco: 1 } },
      { id: 'd', label: 'A small modern studio refining everyday essentials', points: { modern: 2, minimalist: 1 } },
    ],
  },
];

export const CRAFT_DNA_PERSONAS = {
  earthy: {
    key: 'earthy minimalist',
    name: 'Earthy Minimalist',
    tagline: 'Calm, tactile, and made to live with.',
    desc: 'You are drawn to warm ceramics, quiet textiles, and handcrafted pieces that feel grounded without being loud.',
    accent: 'var(--c-rust)',
    categories: ['Pottery', 'Candles', 'Textiles'],
    icon: '◌',
  },
  festive: {
    key: 'festive collector',
    name: 'Festive Collector',
    tagline: 'Joyful craft with a little celebration built in.',
    desc: 'You love gifting, colour, glow, and standout pieces that instantly make a space feel festive and alive.',
    accent: 'var(--c-clay)',
    categories: ['Jewelry', 'Candles', 'Bakery'],
    icon: '✦',
  },
  heritage: {
    key: 'heritage lover',
    name: 'Heritage Lover',
    tagline: 'Tradition, story, and craft memory matter to you.',
    desc: 'You connect with pieces that carry lineage, hand-skill, and the feeling of an older craft story continuing today.',
    accent: 'var(--c-rust)',
    categories: ['Handloom', 'Pottery', 'Textiles'],
    icon: '⟡',
  },
  modern: {
    key: 'modern handmade',
    name: 'Modern Handmade',
    tagline: 'Clean, useful, and thoughtfully made.',
    desc: 'You appreciate contemporary handmade design that feels polished, intentional, and easy to live with every day.',
    accent: 'var(--c-sage)',
    categories: ['Jewelry', 'Ceramics', 'Leather'],
    icon: '□',
  },
  eco: {
    key: 'eco conscious',
    name: 'Eco Conscious',
    tagline: 'Natural materials and mindful making come first.',
    desc: 'You look for makers who work slowly, thoughtfully, and close to their materials, with sustainability built into the process.',
    accent: 'var(--c-sage)',
    categories: ['Textiles', 'Candles', 'Pottery'],
    icon: '☼',
  },
};

export function calculatePersona(answers = {}) {
  const scores = { earthy: 0, festive: 0, heritage: 0, modern: 0, eco: 0, minimalist: 0 };

  Object.values(answers).forEach((points) => {
    Object.entries(points || {}).forEach(([key, value]) => {
      scores[key] = (scores[key] || 0) + value;
    });
  });

  const aliasMap = {
    minimalist: 'earthy',
  };

  const winner = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'earthy';

  const personaKey = aliasMap[winner] || winner;
  const persona = CRAFT_DNA_PERSONAS[personaKey];

  return {
    persona: persona.key,
    categories: persona.categories,
    meta: persona,
  };
}

export function saveCraftDNA(result) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function getStoredCraftDNA() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (stored?.persona && Array.isArray(stored?.categories)) return stored;

    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || 'null');
    if (legacy?.persona && CRAFT_DNA_PERSONAS[legacy.persona]) {
      const migrated = {
        persona: CRAFT_DNA_PERSONAS[legacy.persona].key,
        categories: CRAFT_DNA_PERSONAS[legacy.persona].categories,
      };
      saveCraftDNA(migrated);
      return migrated;
    }
  } catch {}

  return null;
}

export function clearCraftDNA() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function isCraftDNAMatch(category, craftDNA) {
  return Boolean(craftDNA?.categories?.includes(category));
}
