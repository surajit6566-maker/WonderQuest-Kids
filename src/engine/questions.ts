import { AgeGroup, MiniGameId, QuestionItem } from './types';

export interface WordChallenge {
  id: string;
  word: string;
  clue: string;
  emoji: string;
  ageGroups: AgeGroup[];
}

export interface MissingObjectRound {
  id: string;
  targetName: string;
  targetEmoji: string;
  clue: string;
  gridItems: Array<{ id: string; name: string; emoji: string }>;
  ageGroups: AgeGroup[];
}

export interface NumberCatcherRound {
  id: string;
  prompt: string;
  targetValue: number;
  distractors: number[];
  ageGroups: AgeGroup[];
}

export interface MemoryPairItem {
  id: string;
  label: string;
  emoji: string;
  bgHex: string;
}

export interface PicturePuzzlePreset {
  id: string;
  title: string;
  gridSize: 2 | 3;
  themeColors: string[];
  symbols: string[];
  ageGroups: AgeGroup[];
}

// Helper to ensure every quiz game has >= 10 distinct age-appropriate challenges per age tier
const ANIMAL_SOUNDS_LITTLE: QuestionItem[] = [
  {
    id: 'asd-l-1',
    ageGroups: ['little'],
    prompt: 'Which animal says "Moo"?',
    voicePrompt: 'Tap the animal that says Moo!',
    soundCue: 'cow',
    visual: { kind: 'animal', primaryValue: '🐮', secondaryValue: 'Listen closely!' },
    options: [
      { id: 'cow', label: 'Cow', emoji: '🐮' },
      { id: 'duck', label: 'Duck', emoji: '🦆' },
      { id: 'cat', label: 'Cat', emoji: '🐱' },
    ],
    correctOptionId: 'cow',
    explanation: 'Cows live on farms and say "Moo!"',
  },
  {
    id: 'asd-l-2',
    ageGroups: ['little'],
    prompt: 'Which animal says "Meow"?',
    voicePrompt: 'Tap the animal that says Meow!',
    soundCue: 'cat',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Soft purr!' },
    options: [
      { id: 'dog', label: 'Dog', emoji: '🐶' },
      { id: 'cat', label: 'Cat', emoji: '🐱' },
      { id: 'frog', label: 'Frog', emoji: '🐸' },
    ],
    correctOptionId: 'cat',
    explanation: 'Cats say "Meow" when they want to say hello!',
  },
  {
    id: 'asd-l-3',
    ageGroups: ['little'],
    prompt: 'Which animal says "Woof"?',
    voicePrompt: 'Tap the animal that says Woof!',
    soundCue: 'dog',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Happy bark!' },
    options: [
      { id: 'dog', label: 'Dog', emoji: '🐶' },
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
      { id: 'owl', label: 'Owl', emoji: '🦉' },
    ],
    correctOptionId: 'dog',
    explanation: 'Friendly puppies and dogs bark "Woof!"',
  },
  {
    id: 'asd-l-4',
    ageGroups: ['little'],
    prompt: 'Which animal says "Quack"?',
    voicePrompt: 'Tap the animal that says Quack!',
    soundCue: 'duck',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Splash in the pond!' },
    options: [
      { id: 'lion', label: 'Lion', emoji: '🦁' },
      { id: 'duck', label: 'Duck', emoji: '🦆' },
      { id: 'cow', label: 'Cow', emoji: '🐮' },
    ],
    correctOptionId: 'duck',
    explanation: 'Ducks swim in ponds and say "Quack, quack!"',
  },
  {
    id: 'asd-l-5',
    ageGroups: ['little'],
    prompt: 'Which animal says "Roar"?',
    voicePrompt: 'Tap the animal that says Roar!',
    soundCue: 'lion',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Big fuzzy mane!' },
    options: [
      { id: 'lion', label: 'Lion', emoji: '🦁' },
      { id: 'bird', label: 'Bird', emoji: '🐦' },
      { id: 'frog', label: 'Frog', emoji: '🐸' },
    ],
    correctOptionId: 'lion',
    explanation: 'Lions have a big roar on the sunny savanna!',
  },
  {
    id: 'asd-l-6',
    ageGroups: ['little'],
    prompt: 'Which animal says "Ribbit"?',
    voicePrompt: 'Tap the animal that says Ribbit!',
    soundCue: 'frog',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Hop on a lily pad!' },
    options: [
      { id: 'frog', label: 'Frog', emoji: '🐸' },
      { id: 'elephant', label: 'Elephant', emoji: '🐘' },
      { id: 'cat', label: 'Cat', emoji: '🐱' },
    ],
    correctOptionId: 'frog',
    explanation: 'Green frogs hop on lily pads and go "Ribbit!"',
  },
  {
    id: 'asd-l-7',
    ageGroups: ['little'],
    prompt: 'Which animal says "Baa"?',
    voicePrompt: 'Tap the woolly animal that says Baa!',
    soundCue: 'sheep',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Soft fluffy wool!' },
    options: [
      { id: 'duck', label: 'Duck', emoji: '🦆' },
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
      { id: 'dog', label: 'Dog', emoji: '🐶' },
    ],
    correctOptionId: 'sheep',
    explanation: 'Fluffy sheep graze on green grass and say "Baa!"',
  },
  {
    id: 'asd-l-8',
    ageGroups: ['little'],
    prompt: 'Which bird says "Hoo-hoo"?',
    voicePrompt: 'Tap the wise bird that says Hoo hoo!',
    soundCue: 'owl',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Up in a tree!' },
    options: [
      { id: 'owl', label: 'Owl', emoji: '🦉' },
      { id: 'cow', label: 'Cow', emoji: '🐮' },
      { id: 'frog', label: 'Frog', emoji: '🐸' },
    ],
    correctOptionId: 'owl',
    explanation: 'Owls stay awake at night and hoot "Hoo-hoo!"',
  },
  {
    id: 'asd-l-9',
    ageGroups: ['little'],
    prompt: 'Which big animal trumpets with its trunk?',
    voicePrompt: 'Tap the big gray animal with a long trunk!',
    soundCue: 'elephant',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Long trunk!' },
    options: [
      { id: 'elephant', label: 'Elephant', emoji: '🐘' },
      { id: 'cat', label: 'Cat', emoji: '🐱' },
      { id: 'bird', label: 'Bird', emoji: '🐦' },
    ],
    correctOptionId: 'elephant',
    explanation: 'Elephants use their long trunks to trumpet and drink water!',
  },
  {
    id: 'asd-l-10',
    ageGroups: ['little'],
    prompt: 'Which little animal sings "Tweet-tweet"?',
    voicePrompt: 'Tap the little animal that sings Tweet tweet!',
    soundCue: 'bird',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Flies in the sky!' },
    options: [
      { id: 'bird', label: 'Bird', emoji: '🐦' },
      { id: 'lion', label: 'Lion', emoji: '🦁' },
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
    ],
    correctOptionId: 'bird',
    explanation: 'Little birds flap their wings and chirp "Tweet-tweet!"',
  },
];

const ANIMAL_SOUNDS_OLDER: QuestionItem[] = [
  {
    id: 'asd-o-1',
    ageGroups: ['smart', 'super'],
    prompt: 'Listen to the sound! Which habitat does this roaring animal call home?',
    voicePrompt: 'Listen closely! Which animal makes this sound?',
    soundCue: 'lion',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Grassland Pride' },
    options: [
      { id: 'lion', label: 'Lion (Savanna)', emoji: '🦁' },
      { id: 'owl', label: 'Owl (Forest)', emoji: '🦉' },
      { id: 'frog', label: 'Frog (Pond)', emoji: '🐸' },
      { id: 'duck', label: 'Duck (Lake)', emoji: '🦆' },
    ],
    correctOptionId: 'lion',
    explanation: 'Lions live in prides across sunny savannas and grasslands.',
  },
  {
    id: 'asd-o-2',
    ageGroups: ['smart', 'super'],
    prompt: 'Which nocturnal woodland bird makes this hooting call?',
    soundCue: 'owl',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Night Hunter' },
    options: [
      { id: 'bird', label: 'Songbird', emoji: '🐦' },
      { id: 'owl', label: 'Owl', emoji: '🦉' },
      { id: 'duck', label: 'Duck', emoji: '🦆' },
      { id: 'cat', label: 'Wildcat', emoji: '🐱' },
    ],
    correctOptionId: 'owl',
    explanation: 'Owls have special silent feathers and keen night vision!',
  },
  {
    id: 'asd-o-3',
    ageGroups: ['smart', 'super'],
    prompt: 'Which amphibian croaks near wetlands after rain?',
    soundCue: 'frog',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Wetland Pond' },
    options: [
      { id: 'frog', label: 'Frog', emoji: '🐸' },
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
      { id: 'elephant', label: 'Elephant', emoji: '🐘' },
      { id: 'dog', label: 'Dog', emoji: '🐶' },
    ],
    correctOptionId: 'frog',
    explanation: 'Frogs are amphibians that live both in water and on land.',
  },
  {
    id: 'asd-o-4',
    ageGroups: ['smart', 'super'],
    prompt: 'Which largest land mammal uses its trunk to trumpet?',
    soundCue: 'elephant',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Herd Traveler' },
    options: [
      { id: 'cow', label: 'Cow', emoji: '🐮' },
      { id: 'elephant', label: 'Elephant', emoji: '🐘' },
      { id: 'lion', label: 'Lion', emoji: '🦁' },
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
    ],
    correctOptionId: 'elephant',
    explanation: 'Elephants communicate across long distances using trumpets and low rumbles.',
  },
  {
    id: 'asd-o-5',
    ageGroups: ['smart', 'super'],
    prompt: 'Which waterfowl has waterproof feathers and makes this sound?',
    soundCue: 'duck',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Webbed Feet' },
    options: [
      { id: 'duck', label: 'Duck', emoji: '🦆' },
      { id: 'owl', label: 'Owl', emoji: '🦉' },
      { id: 'cat', label: 'Cat', emoji: '🐱' },
      { id: 'bird', label: 'Sparrow', emoji: '🐦' },
    ],
    correctOptionId: 'duck',
    explanation: 'Ducks preen natural oil onto their feathers so water rolls right off.',
  },
  {
    id: 'asd-o-6',
    ageGroups: ['smart', 'super'],
    prompt: 'Which farm herbivore gives milk and makes this low sound?',
    soundCue: 'cow',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Green Pasture' },
    options: [
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
      { id: 'cow', label: 'Cow', emoji: '🐮' },
      { id: 'dog', label: 'Dog', emoji: '🐶' },
      { id: 'frog', label: 'Frog', emoji: '🐸' },
    ],
    correctOptionId: 'cow',
    explanation: 'Cows are herbivores that spend hours chewing grass and clover.',
  },
  {
    id: 'asd-o-7',
    ageGroups: ['smart', 'super'],
    prompt: 'Which loyal domestic animal uses barking to communicate?',
    soundCue: 'dog',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Keen Sense of Smell' },
    options: [
      { id: 'cat', label: 'Cat', emoji: '🐱' },
      { id: 'dog', label: 'Dog', emoji: '🐶' },
      { id: 'lion', label: 'Lion', emoji: '🦁' },
      { id: 'duck', label: 'Duck', emoji: '🦆' },
    ],
    correctOptionId: 'dog',
    explanation: 'Dogs have an extraordinary sense of smell—thousands of times stronger than ours!',
  },
  {
    id: 'asd-o-8',
    ageGroups: ['smart', 'super'],
    prompt: 'Which woolly mammal lives in flocks and bleats?',
    soundCue: 'sheep',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Mountain Meadow' },
    options: [
      { id: 'sheep', label: 'Sheep', emoji: '🐑' },
      { id: 'cow', label: 'Cow', emoji: '🐮' },
      { id: 'elephant', label: 'Elephant', emoji: '🐘' },
      { id: 'owl', label: 'Owl', emoji: '🦉' },
    ],
    correctOptionId: 'sheep',
    explanation: 'Lambs recognize their mother’s voice within days of being born!',
  },
  {
    id: 'asd-o-9',
    ageGroups: ['smart', 'super'],
    prompt: 'Which agile pet purrs softly and meows to people?',
    soundCue: 'cat',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Retractable Claws' },
    options: [
      { id: 'cat', label: 'Cat', emoji: '🐱' },
      { id: 'frog', label: 'Frog', emoji: '🐸' },
      { id: 'bird', label: 'Bird', emoji: '🐦' },
      { id: 'cow', label: 'Cow', emoji: '🐮' },
    ],
    correctOptionId: 'cat',
    explanation: 'Cats use whiskers to measure tight spaces before jumping.',
  },
  {
    id: 'asd-o-10',
    ageGroups: ['smart', 'super'],
    prompt: 'Which feathered flyer sings bright melodies at sunrise?',
    soundCue: 'bird',
    visual: { kind: 'animal', primaryValue: '🔊', secondaryValue: 'Dawn Chorus' },
    options: [
      { id: 'bird', label: 'Songbird', emoji: '🐦' },
      { id: 'frog', label: 'Frog', emoji: '🐸' },
      { id: 'elephant', label: 'Elephant', emoji: '🐘' },
      { id: 'dog', label: 'Dog', emoji: '🐶' },
    ],
    correctOptionId: 'bird',
    explanation: 'Songbirds sing at dawn to greet the morning and talk to nearby birds.',
  },
];

function buildColorQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const items: Array<{ name: string; hex: string; obj: string }> = [
      { name: 'Red', hex: '#EF4444', obj: 'Red Apple' },
      { name: 'Blue', hex: '#3B82F6', obj: 'Blue Whale' },
      { name: 'Yellow', hex: '#FACC15', obj: 'Yellow Sun' },
      { name: 'Green', hex: '#22C55E', obj: 'Green Leaf' },
      { name: 'Orange', hex: '#F97316', obj: 'Orange Carrot' },
      { name: 'Purple', hex: '#A855F7', obj: 'Purple Grapes' },
      { name: 'Pink', hex: '#EC4899', obj: 'Pink Flower' },
      { name: 'Brown', hex: '#92400E', obj: 'Brown Bear' },
      { name: 'Sky Blue', hex: '#57C7F2', obj: 'Sky Cloud' },
      { name: 'Gold', hex: '#EAB308', obj: 'Golden Star' },
    ];
    return items.map((item, idx) => {
      const alt1 = items[(idx + 2) % items.length];
      const alt2 = items[(idx + 5) % items.length];
      const opts = [item, alt1, alt2].sort((a, b) => a.name.localeCompare(b.name));
      return {
        id: `col-l-${idx}`,
        ageGroups: ['little'],
        prompt: `Tap the ${item.name} color!`,
        voicePrompt: `Can you find the ${item.name} swatch?`,
        visual: { kind: 'color', primaryValue: item.name, colorHex: item.hex, secondaryValue: item.obj },
        options: opts.map((o) => ({ id: o.name, label: o.name, colorHex: o.hex })),
        correctOptionId: item.name,
        explanation: `Awesome! ${item.obj} matches the color ${item.name}.`,
      };
    });
  }

  const mixes: Array<{
    prompt: string;
    aHex: string;
    bHex: string;
    answer: string;
    answerHex: string;
    options: Array<{ name: string; hex: string }>;
    exp: string;
  }> = [
    {
      prompt: 'What color do Red and Yellow paint make when mixed?',
      aHex: '#EF4444',
      bHex: '#FACC15',
      answer: 'Orange',
      answerHex: '#F97316',
      options: [
        { name: 'Orange', hex: '#F97316' },
        { name: 'Green', hex: '#22C55E' },
        { name: 'Purple', hex: '#A855F7' },
        { name: 'Brown', hex: '#92400E' },
      ],
      exp: 'Red + Yellow creates bright Orange!',
    },
    {
      prompt: 'What color do Blue and Yellow paint make together?',
      aHex: '#3B82F6',
      bHex: '#FACC15',
      answer: 'Green',
      answerHex: '#22C55E',
      options: [
        { name: 'Purple', hex: '#A855F7' },
        { name: 'Green', hex: '#22C55E' },
        { name: 'Orange', hex: '#F97316' },
        { name: 'Pink', hex: '#EC4899' },
      ],
      exp: 'Blue + Yellow makes fresh Green!',
    },
    {
      prompt: 'What color do Red and Blue paint make?',
      aHex: '#EF4444',
      bHex: '#3B82F6',
      answer: 'Purple',
      answerHex: '#A855F7',
      options: [
        { name: 'Green', hex: '#22C55E' },
        { name: 'Yellow', hex: '#FACC15' },
        { name: 'Purple', hex: '#A855F7' },
        { name: 'Teal', hex: '#14B8A6' },
      ],
      exp: 'Red + Blue blends into rich Purple!',
    },
    {
      prompt: 'What happens when you mix Red and White paint?',
      aHex: '#EF4444',
      bHex: '#FFFFFF',
      answer: 'Pink',
      answerHex: '#F472B6',
      options: [
        { name: 'Pink', hex: '#F472B6' },
        { name: 'Black', hex: '#1E293B' },
        { name: 'Green', hex: '#22C55E' },
        { name: 'Navy', hex: '#1E3A8A' },
      ],
      exp: 'Adding white lightens Red into Pink!',
    },
    {
      prompt: 'Which three colors are the traditional paint primary colors?',
      aHex: '#EF4444',
      bHex: '#3B82F6',
      answer: 'Red, Yellow, Blue',
      answerHex: '#FFD95A',
      options: [
        { name: 'Red, Yellow, Blue', hex: '#FFD95A' },
        { name: 'Green, Orange, Gray', hex: '#94A3B8' },
        { name: 'Pink, Brown, Black', hex: '#EC4899' },
        { name: 'Purple, White, Teal', hex: '#B9A6F6' },
      ],
      exp: 'Red, Yellow, and Blue are the classic painter primary colors.',
    },
    {
      prompt: 'Which color sits directly opposite Red on the color wheel?',
      aHex: '#EF4444',
      bHex: '#22C55E',
      answer: 'Green',
      answerHex: '#22C55E',
      options: [
        { name: 'Green', hex: '#22C55E' },
        { name: 'Orange', hex: '#F97316' },
        { name: 'Yellow', hex: '#FACC15' },
        { name: 'Pink', hex: '#F472B6' },
      ],
      exp: 'Red and Green are complementary colors across the color wheel!',
    },
    {
      prompt: 'Which color sits opposite Blue on the color wheel?',
      aHex: '#3B82F6',
      bHex: '#F97316',
      answer: 'Orange',
      answerHex: '#F97316',
      options: [
        { name: 'Purple', hex: '#A855F7' },
        { name: 'Orange', hex: '#F97316' },
        { name: 'Teal', hex: '#14B8A6' },
        { name: 'Indigo', hex: '#6366F1' },
      ],
      exp: 'Blue and Orange are complementary colors that pop next to each other!',
    },
    {
      prompt: 'What color is created when Blue mixes with Green?',
      aHex: '#3B82F6',
      bHex: '#22C55E',
      answer: 'Teal',
      answerHex: '#14B8A6',
      options: [
        { name: 'Teal', hex: '#14B8A6' },
        { name: 'Magenta', hex: '#D946EF' },
        { name: 'Coral', hex: '#FF9566' },
        { name: 'Gold', hex: '#EAB308' },
      ],
      exp: 'Blue + Green blends into cool ocean Teal!',
    },
    {
      prompt: 'Which warm color family includes sunbeams and marigolds?',
      aHex: '#FACC15',
      bHex: '#FF9566',
      answer: 'Warm Colors',
      answerHex: '#FF9566',
      options: [
        { name: 'Warm Colors', hex: '#FF9566' },
        { name: 'Cool Colors', hex: '#57C7F2' },
        { name: 'Grayscale', hex: '#94A3B8' },
        { name: 'Ultraviolet', hex: '#7C3AED' },
      ],
      exp: 'Reds, oranges, and yellows belong to the warm color family.',
    },
    {
      prompt: 'Which shade is made by adding a little Black to Blue?',
      aHex: '#3B82F6',
      bHex: '#1E293B',
      answer: 'Navy Blue',
      answerHex: '#1E3A8A',
      options: [
        { name: 'Navy Blue', hex: '#1E3A8A' },
        { name: 'Sky Blue', hex: '#57C7F2' },
        { name: 'Mint Green', hex: '#8DE3B2' },
        { name: 'Lavender', hex: '#B9A6F6' },
      ],
      exp: 'Adding black creates a darker shade called Navy Blue!',
    },
  ];

  return mixes.map((m, idx) => ({
    id: `col-${ageGroup}-${idx}`,
    ageGroups: ['smart', 'super'],
    prompt: m.prompt,
    voicePrompt: m.prompt,
    visual: { kind: 'color', primaryValue: m.answer, colorHex: m.aHex, secondaryValue: m.bHex },
    options: m.options.map((o) => ({ id: o.name, label: o.name, colorHex: o.hex })),
    correctOptionId: m.answer,
    explanation: m.exp,
  }));
}

function buildShapeQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const shapes = [
      { id: 'circle', label: 'Circle', clue: 'Round like a bouncy ball!' },
      { id: 'square', label: 'Square', clue: '4 equal sides like a window!' },
      { id: 'triangle', label: 'Triangle', clue: '3 pointy corners like a slice of pizza!' },
      { id: 'star', label: 'Star', clue: 'Twinkles high in the night sky!' },
      { id: 'heart', label: 'Heart', clue: 'Full of love and kindness!' },
      { id: 'oval', label: 'Oval', clue: 'Shaped like a cozy egg!' },
      { id: 'diamond', label: 'Diamond', clue: 'Shaped like a flying kite!' },
      { id: 'rectangle', label: 'Rectangle', clue: 'Long like a storybook!' },
      { id: 'pentagon', label: 'Pentagon', clue: 'Shaped like a little house with 5 sides!' },
      { id: 'hexagon', label: 'Hexagon', clue: '6 sides like a honeycomb cell!' },
    ];
    return shapes.map((s, idx) => {
      const a1 = shapes[(idx + 1) % shapes.length];
      const a2 = shapes[(idx + 4) % shapes.length];
      const opts = [s, a1, a2].sort((x, y) => x.label.localeCompare(y.label));
      return {
        id: `shp-l-${idx}`,
        ageGroups: ['little'],
        prompt: `Which shape is a ${s.label}?`,
        voicePrompt: `Tap the ${s.label}! ${s.clue}`,
        visual: { kind: 'shape', primaryValue: s.id, secondaryValue: s.clue },
        options: opts.map((o) => ({ id: o.id, label: o.label })),
        correctOptionId: s.id,
        explanation: `Great job! A ${s.label} is ${s.clue.toLowerCase()}`,
      };
    });
  }

  const olderShapes = [
    { id: 'triangle', label: 'Triangle (3)', prompt: 'How many sides does a triangle have?', ans: '3 sides', opts: ['3 sides', '4 sides', '5 sides', '6 sides'], exp: 'Tri means three—every triangle has 3 sides and 3 angles.' },
    { id: 'pentagon', label: 'Pentagon (5)', prompt: 'Which polygon has 5 straight sides?', ans: 'Pentagon', opts: ['Pentagon', 'Hexagon', 'Octagon', 'Square'], exp: 'A pentagon has 5 sides—like home plate in baseball!' },
    { id: 'hexagon', label: 'Hexagon (6)', prompt: 'Bees build honeycombs using which 6-sided shape?', ans: 'Hexagon', opts: ['Hexagon', 'Triangle', 'Pentagon', 'Octagon'], exp: 'Hexagons pack tightly with zero wasted space!' },
    { id: 'octagon', label: 'Octagon (8)', prompt: 'A red STOP street sign is shaped like an:', ans: 'Octagon', opts: ['Octagon', 'Hexagon', 'Rectangle', 'Diamond'], exp: 'Octa means eight—a STOP sign has 8 equal sides.' },
    { id: 'rectangle', label: 'Rectangle', prompt: 'Which shape has 4 right angles and opposite sides equal?', ans: 'Rectangle', opts: ['Rectangle', 'Triangle', 'Oval', 'Pentagon'], exp: 'Rectangles have two long sides, two shorter sides, and four 90-degree corners.' },
    { id: 'circle', label: 'Circle', prompt: 'Which 2D shape has zero straight corners?', ans: 'Circle', opts: ['Circle', 'Square', 'Triangle', 'Diamond'], exp: 'A circle is a continuous curved loop with every point equal distance from center.' },
    { id: 'diamond', label: 'Rhombus', prompt: 'A diamond with 4 equal sides is also called a:', ans: 'Rhombus', opts: ['Rhombus', 'Cube', 'Cylinder', 'Cone'], exp: 'A rhombus has 4 equal sides tilted like a kite!' },
    { id: 'square', label: 'Square', prompt: 'If each side of a square is 5 cm, what is its perimeter?', ans: '20 cm', opts: ['20 cm', '15 cm', '10 cm', '25 cm'], exp: '4 equal sides × 5 cm = 20 cm around!' },
    { id: 'star', label: 'Star', prompt: 'How many outer tips does a classic 5-point star have?', ans: '5 tips', opts: ['5 tips', '4 tips', '6 tips', '8 tips'], exp: 'A classic 5-point star has 5 points and 10 total edges.' },
    { id: 'oval', label: 'Ellipse', prompt: 'Planets orbit the Sun in a stretched circle called an:', ans: 'Ellipse (Oval)', opts: ['Ellipse (Oval)', 'Square', 'Triangle', 'Octagon'], exp: 'Johannes Kepler discovered planetary orbits are ellipses!' },
  ];

  return olderShapes.map((q, idx) => ({
    id: `shp-o-${idx}`,
    ageGroups: ['smart', 'super'],
    prompt: q.prompt,
    voicePrompt: q.prompt,
    visual: { kind: 'shape', primaryValue: q.id, secondaryValue: q.label },
    options: q.opts.map((o) => ({ id: o, label: o })),
    correctOptionId: q.ans,
    explanation: q.exp,
  }));
}

function buildAdditionQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const counts = [
      { a: 1, b: 1, icon: '🍎', name: 'apples' },
      { a: 2, b: 1, icon: '⭐', name: 'stars' },
      { a: 2, b: 2, icon: '🦋', name: 'butterflies' },
      { a: 3, b: 1, icon: '🐟', name: 'fish' },
      { a: 3, b: 2, icon: '🍓', name: 'berries' },
      { a: 4, b: 1, icon: '🎈', name: 'balloons' },
      { a: 3, b: 3, icon: '🌼', name: 'flowers' },
      { a: 4, b: 3, icon: '🐥', name: 'chicks' },
      { a: 5, b: 3, icon: '🐢', name: 'turtles' },
      { a: 5, b: 5, icon: '🍪', name: 'cookies' },
    ];
    return counts.map((c, idx) => {
      const sum = c.a + c.b;
      const optSet = new Set([sum, Math.max(1, sum - 1), sum + 1, sum + 2]);
      const opts = Array.from(optSet).slice(0, 3).sort((x, y) => x - y);
      return {
        id: `add-l-${idx}`,
        ageGroups: ['little'],
        prompt: `Count all the ${c.name}: ${c.a} + ${c.b} = ?`,
        voicePrompt: `Count the ${c.name}! What is ${c.a} plus ${c.b}?`,
        visual: {
          kind: 'count',
          primaryValue: c.icon,
          count: sum,
          secondaryValue: `${c.a} and ${c.b} more`,
        },
        options: opts.map((n) => ({ id: String(n), label: String(n) })),
        correctOptionId: String(sum),
        explanation: `Let us count together: ${c.a} + ${c.b} = ${sum} ${c.name}!`,
      };
    });
  }

  if (ageGroup === 'smart') {
    const pairs = [
      [4, 5],
      [6, 7],
      [8, 5],
      [9, 6],
      [11, 4],
      [12, 8],
      [14, 5],
      [15, 7],
      [18, 6],
      [16, 12],
    ];
    return pairs.map(([a, b], idx) => {
      const ans = a + b;
      const opts = [ans, ans - 2, ans + 1, ans + 3].sort((x, y) => x - y);
      return {
        id: `add-s-${idx}`,
        ageGroups: ['smart'],
        prompt: `Solve the rocket fuel sum: ${a} + ${b} = ?`,
        voicePrompt: `What is ${a} plus ${b}?`,
        visual: { kind: 'math', primaryValue: `${a} + ${b} = ?`, secondaryValue: 'Addition Boost' },
        options: opts.map((n) => ({ id: String(n), label: String(n) })),
        correctOptionId: String(ans),
        explanation: `${a} + ${b} equals ${ans}!`,
      };
    });
  }

  // Super Explorers (9-12): Multiplication & multi-step addition
  const superPairs = [
    { prompt: 'Multiply to launch: 6 × 7 = ?', eq: '6 × 7 = ?', ans: 42, alt: [36, 48, 49], exp: '6 groups of 7 equals 42.' },
    { prompt: 'What is 8 × 9?', eq: '8 × 9 = ?', ans: 72, alt: [64, 81, 63], exp: '8 × 9 = 72.' },
    { prompt: 'What is 12 × 5?', eq: '12 × 5 = ?', ans: 60, alt: [50, 55, 65], exp: '12 × 5 = 60.' },
    { prompt: 'Solve: (4 × 6) + 10 = ?', eq: '(4 × 6) + 10', ans: 34, alt: [24, 30, 44], exp: '4 × 6 = 24, then + 10 = 34!' },
    { prompt: 'What is 9 × 7?', eq: '9 × 7 = ?', ans: 63, alt: [56, 72, 54], exp: '9 × 7 = 63.' },
    { prompt: 'What is 15 × 4?', eq: '15 × 4 = ?', ans: 60, alt: [45, 55, 75], exp: 'Two 15s are 30, four 15s are 60!' },
    { prompt: 'Solve: 48 + 37 = ?', eq: '48 + 37 = ?', ans: 85, alt: [75, 83, 95], exp: '48 + 37 = 85.' },
    { prompt: 'What is 11 × 8?', eq: '11 × 8 = ?', ans: 88, alt: [77, 98, 81], exp: '11 × 8 = 88.' },
    { prompt: 'Solve: (7 × 5) + 15 = ?', eq: '(7 × 5) + 15', ans: 50, alt: [35, 45, 55], exp: '7 × 5 = 35, and 35 + 15 = 50!' },
    { prompt: 'What is 13 × 6?', eq: '13 × 6 = ?', ans: 78, alt: [68, 72, 84], exp: '10 × 6 = 60 plus 3 × 6 = 18 gives 78!' },
  ];
  return superPairs.map((q, idx) => {
    const opts = [q.ans, ...q.alt].sort((x, y) => x - y);
    return {
      id: `add-sup-${idx}`,
      ageGroups: ['super'],
      prompt: q.prompt,
      visual: { kind: 'math', primaryValue: q.eq, secondaryValue: 'Space Math Mission' },
      options: opts.map((n) => ({ id: String(n), label: String(n) })),
      correctOptionId: String(q.ans),
      explanation: q.exp,
    };
  });
}

function buildSubtractionQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const items = [
      { total: 3, take: 1, icon: '🍎' },
      { total: 4, take: 2, icon: '🎈' },
      { total: 5, take: 1, icon: '⭐' },
      { total: 5, take: 2, icon: '🐥' },
      { total: 4, take: 1, icon: '🐟' },
      { total: 6, take: 2, icon: '🍪' },
      { total: 6, take: 3, icon: '🍓' },
      { total: 7, take: 2, icon: '🌼' },
      { total: 8, take: 3, icon: '🦋' },
      { total: 10, take: 4, icon: '🐢' },
    ];
    return items.map((item, idx) => {
      const left = item.total - item.take;
      const opts = Array.from(new Set([left, left + 1, Math.max(0, left - 1), left + 2]))
        .slice(0, 3)
        .sort((x, y) => x - y);
      return {
        id: `sub-l-${idx}`,
        ageGroups: ['little'],
        prompt: `There were ${item.total}. ${item.take} flew away! How many are left?`,
        voicePrompt: `${item.total} take away ${item.take}. How many are left?`,
        visual: {
          kind: 'count',
          primaryValue: item.icon,
          count: left,
          secondaryValue: `${item.total} minus ${item.take}`,
        },
        options: opts.map((n) => ({ id: String(n), label: String(n) })),
        correctOptionId: String(left),
        explanation: `${item.total} minus ${item.take} leaves ${left}!`,
      };
    });
  }

  if (ageGroup === 'smart') {
    const pairs = [
      [9, 4],
      [12, 5],
      [14, 6],
      [15, 7],
      [18, 9],
      [20, 8],
      [22, 6],
      [25, 10],
      [27, 9],
      [30, 12],
    ];
    return pairs.map(([a, b], idx) => {
      const ans = a - b;
      const opts = [ans, ans + 2, Math.max(1, ans - 1), ans + 4].sort((x, y) => x - y);
      return {
        id: `sub-s-${idx}`,
        ageGroups: ['smart'],
        prompt: `What is ${a} − ${b}?`,
        voicePrompt: `What is ${a} minus ${b}?`,
        visual: { kind: 'math', primaryValue: `${a} − ${b} = ?`, secondaryValue: 'Subtraction' },
        options: opts.map((n) => ({ id: String(n), label: String(n) })),
        correctOptionId: String(ans),
        explanation: `${a} − ${b} = ${ans}!`,
      };
    });
  }

  const superDiv = [
    { prompt: 'Share 24 stars equally among 4 rockets: 24 ÷ 4 = ?', eq: '24 ÷ 4 = ?', ans: 6, alt: [4, 8, 5], exp: '4 × 6 = 24, so 24 ÷ 4 = 6.' },
    { prompt: 'Solve: 45 ÷ 5 = ?', eq: '45 ÷ 5 = ?', ans: 9, alt: [7, 8, 10], exp: '5 × 9 = 45.' },
    { prompt: 'Solve: 56 ÷ 7 = ?', eq: '56 ÷ 7 = ?', ans: 8, alt: [6, 7, 9], exp: '7 × 8 = 56.' },
    { prompt: 'Solve: 81 ÷ 9 = ?', eq: '81 ÷ 9 = ?', ans: 9, alt: [7, 8, 11], exp: '9 × 9 = 81.' },
    { prompt: 'Solve: 72 ÷ 8 = ?', eq: '72 ÷ 8 = ?', ans: 9, alt: [6, 8, 12], exp: '8 × 9 = 72.' },
    { prompt: 'Solve: 100 − 37 = ?', eq: '100 − 37 = ?', ans: 63, alt: [67, 73, 53], exp: '100 − 37 = 63.' },
    { prompt: 'Solve: 64 ÷ 8 = ?', eq: '64 ÷ 8 = ?', ans: 8, alt: [6, 7, 9], exp: '8 × 8 = 64.' },
    { prompt: 'Solve: 96 ÷ 12 = ?', eq: '96 ÷ 12 = ?', ans: 8, alt: [6, 7, 9], exp: '12 × 8 = 96.' },
    { prompt: 'Solve: (60 ÷ 5) − 4 = ?', eq: '(60 ÷ 5) − 4', ans: 8, alt: [12, 6, 10], exp: '60 ÷ 5 = 12, then 12 − 4 = 8.' },
    { prompt: 'Solve: 144 ÷ 12 = ?', eq: '144 ÷ 12 = ?', ans: 12, alt: [10, 11, 14], exp: '12 × 12 = 144!' },
  ];
  return superDiv.map((q, idx) => {
    const opts = [q.ans, ...q.alt].sort((x, y) => x - y);
    return {
      id: `sub-sup-${idx}`,
      ageGroups: ['super'],
      prompt: q.prompt,
      visual: { kind: 'math', primaryValue: q.eq, secondaryValue: 'Division & Logic' },
      options: opts.map((n) => ({ id: String(n), label: String(n) })),
      correctOptionId: String(q.ans),
      explanation: q.exp,
    };
  });
}

function buildPatternQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const seqs = [
      { a: { shape: 'circle', color: '#EF4444', label: 'Red Circle' }, b: { shape: 'square', color: '#3B82F6', label: 'Blue Square' }, ans: 'Red Circle' },
      { a: { shape: 'star', color: '#FACC15', label: 'Yellow Star' }, b: { shape: 'triangle', color: '#22C55E', label: 'Green Triangle' }, ans: 'Yellow Star' },
      { a: { shape: 'heart', color: '#EC4899', label: 'Pink Heart' }, b: { shape: 'circle', color: '#57C7F2', label: 'Blue Circle' }, ans: 'Pink Heart' },
      { a: { shape: 'square', color: '#FF9566', label: 'Orange Square' }, b: { shape: 'star', color: '#B9A6F6', label: 'Purple Star' }, ans: 'Orange Square' },
      { a: { shape: 'triangle', color: '#8DE3B2', label: 'Mint Triangle' }, b: { shape: 'diamond', color: '#FFD95A', label: 'Gold Diamond' }, ans: 'Mint Triangle' },
      { a: { shape: 'circle', color: '#B9A6F6', label: 'Purple Circle' }, b: { shape: 'heart', color: '#EF4444', label: 'Red Heart' }, ans: 'Purple Circle' },
      { a: { shape: 'diamond', color: '#57C7F2', label: 'Blue Diamond' }, b: { shape: 'star', color: '#FACC15', label: 'Yellow Star' }, ans: 'Blue Diamond' },
      { a: { shape: 'square', color: '#22C55E', label: 'Green Square' }, b: { shape: 'circle', color: '#FF9566', label: 'Orange Circle' }, ans: 'Green Square' },
      { a: { shape: 'star', color: '#FF9566', label: 'Orange Star' }, b: { shape: 'oval', color: '#57C7F2', label: 'Blue Oval' }, ans: 'Orange Star' },
      { a: { shape: 'heart', color: '#A855F7', label: 'Purple Heart' }, b: { shape: 'triangle', color: '#FACC15', label: 'Yellow Triangle' }, ans: 'Purple Heart' },
    ];
    return seqs.map((s, idx) => ({
      id: `pat-l-${idx}`,
      ageGroups: ['little'],
      prompt: 'What comes next in this pattern?',
      voicePrompt: 'Look at the pattern! Which shape comes next?',
      visual: {
        kind: 'pattern',
        primaryValue: 'ABAB',
        patternSequence: [s.a, s.b, s.a, s.b],
      },
      options: [
        { id: s.a.label, label: s.a.label, colorHex: s.a.color },
        { id: s.b.label, label: s.b.label, colorHex: s.b.color },
      ],
      correctOptionId: s.ans,
      explanation: `The pattern repeats ${s.a.label}, then ${s.b.label} — so ${s.a.label} comes next!`,
    }));
  }

  const numberPatterns = ageGroup === 'smart'
    ? [
        { seq: ['2', '4', '6', '8', '?'], ans: '10', opts: ['9', '10', '11', '12'], exp: 'Count by 2s: +2 each step gives 10!' },
        { seq: ['5', '10', '15', '20', '?'], ans: '25', opts: ['22', '24', '25', '30'], exp: 'Count by 5s: 20 + 5 = 25!' },
        { seq: ['10', '20', '30', '40', '?'], ans: '50', opts: ['45', '50', '55', '60'], exp: 'Add 10 each step to reach 50!' },
        { seq: ['1', '3', '5', '7', '?'], ans: '9', opts: ['8', '9', '10', '11'], exp: 'Odd numbers increase by 2 each time: 7 + 2 = 9!' },
        { seq: ['20', '18', '16', '14', '?'], ans: '12', opts: ['10', '11', '12', '13'], exp: 'Subtract 2 each step: 14 − 2 = 12!' },
        { seq: ['3', '6', '9', '12', '?'], ans: '15', opts: ['13', '14', '15', '16'], exp: 'Skip count by 3s: 12 + 3 = 15!' },
        { seq: ['10', '9', '8', '7', '?'], ans: '6', opts: ['5', '6', '7', '8'], exp: 'Counting backward by 1 gives 6!' },
        { seq: ['4', '8', '12', '16', '?'], ans: '20', opts: ['18', '19', '20', '24'], exp: 'Add 4 each time: 16 + 4 = 20!' },
        { seq: ['1', '2', '4', '5', '7', '8', '?'], ans: '10', opts: ['9', '10', '11', '12'], exp: 'The rule alternates +1, +2! 8 + 2 = 10!' },
        { seq: ['50', '45', '40', '35', '?'], ans: '30', opts: ['25', '30', '32', '34'], exp: 'Subtract 5 each step: 35 − 5 = 30!' },
      ]
    : [
        { seq: ['2', '4', '8', '16', '?'], ans: '32', opts: ['24', '28', '32', '36'], exp: 'Each number doubles (×2): 16 × 2 = 32!' },
        { seq: ['1', '1', '2', '3', '5', '8', '?'], ans: '13', opts: ['11', '12', '13', '14'], exp: 'Fibonacci rule: add the two previous numbers (5 + 8 = 13)!' },
        { seq: ['1', '4', '9', '16', '?'], ans: '25', opts: ['20', '24', '25', '36'], exp: 'Square numbers (1², 2², 3², 4², 5² = 25)!' },
        { seq: ['100', '90', '81', '73', '?'], ans: '66', opts: ['64', '65', '66', '67'], exp: 'Subtract 10, then 9, then 8, then 7: 73 − 7 = 66!' },
        { seq: ['3', '9', '27', '?'], ans: '81', opts: ['54', '63', '81', '90'], exp: 'Multiply by 3 each step: 27 × 3 = 81!' },
        { seq: ['12', '15', '19', '24', '?'], ans: '30', opts: ['28', '29', '30', '31'], exp: 'Add +3, +4, +5, +6: 24 + 6 = 30!' },
        { seq: ['64', '32', '16', '8', '?'], ans: '4', opts: ['2', '4', '6', '0'], exp: 'Divide by 2 each step: 8 ÷ 2 = 4!' },
        { seq: ['2', '6', '12', '20', '?'], ans: '30', opts: ['26', '28', '30', '32'], exp: 'Add +4, +6, +8, +10: 20 + 10 = 30!' },
        { seq: ['7', '14', '21', '28', '?'], ans: '35', opts: ['32', '35', '36', '42'], exp: 'Multiples of 7: 7 × 5 = 35!' },
        { seq: ['5', '11', '23', '47', '?'], ans: '95', opts: ['85', '91', '95', '99'], exp: 'Rule is (×2) + 1: (47 × 2) + 1 = 95!' },
      ];

  return numberPatterns.map((p, idx) => ({
    id: `pat-${ageGroup}-${idx}`,
    ageGroups: [ageGroup],
    prompt: `Find the missing number in the sequence: ${p.seq.join('  ·  ')}`,
    visual: { kind: 'math', primaryValue: p.seq.join(' , '), secondaryValue: 'Missing Number Logic' },
    options: p.opts.map((o) => ({ id: o, label: o })),
    correctOptionId: p.ans,
    explanation: p.exp,
  }));
}

function buildSpellingQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const firstLetters = [
      { word: 'Apple', emoji: '🍎', letter: 'A', alts: ['B', 'M'] },
      { word: 'Ball', emoji: '⚽', letter: 'B', alts: ['D', 'T'] },
      { word: 'Cat', emoji: '🐱', letter: 'C', alts: ['P', 'S'] },
      { word: 'Dog', emoji: '🐶', letter: 'D', alts: ['G', 'L'] },
      { word: 'Elephant', emoji: '🐘', letter: 'E', alts: ['A', 'O'] },
      { word: 'Fish', emoji: '🐟', letter: 'F', alts: ['R', 'K'] },
      { word: 'Sun', emoji: '☀️', letter: 'S', alts: ['N', 'B'] },
      { word: 'Moon', emoji: '🌙', letter: 'M', alts: ['T', 'C'] },
      { word: 'Tree', emoji: '🌳', letter: 'T', alts: ['H', 'W'] },
      { word: 'Star', emoji: '⭐', letter: 'S', alts: ['P', 'F'] },
    ];
    return firstLetters.map((item, idx) => ({
      id: `spl-l-${idx}`,
      ageGroups: ['little'],
      prompt: `What letter does "${item.word}" start with?`,
      voicePrompt: `${item.word} starts with which letter?`,
      visual: { kind: 'word', primaryValue: item.emoji, secondaryValue: item.word },
      options: [item.letter, ...item.alts].sort().map((l) => ({ id: l, label: l })),
      correctOptionId: item.letter,
      explanation: `Yes! ${item.letter} is for ${item.word}!`,
    }));
  }

  const spellingSet = ageGroup === 'smart'
    ? [
        { emoji: '🌈', prompt: 'Pick the correct spelling for the colorful sky arch:', ans: 'RAINBOW', opts: ['RAINBOW', 'RANEBOW', 'RAINBO', 'REINBOW'], exp: 'R-A-I-N-B-O-W combines rain + bow!' },
        { emoji: '🦋', prompt: 'Pick the correct spelling for this fluttering insect:', ans: 'BUTTERFLY', opts: ['BUTTERFLY', 'BUTERFLY', 'BUTTERFLI', 'BATTERFLY'], exp: 'B-U-T-T-E-R-F-L-Y has two Ts!' },
        { emoji: '🐢', prompt: 'Which word is spelled right for this shelled reptile?', ans: 'TURTLE', opts: ['TURTLE', 'TERTLE', 'TURTEL', 'TORTLE'], exp: 'T-U-R-T-L-E ends with L-E.' },
        { emoji: '🚀', prompt: 'Choose the correct spelling for a space vehicle:', ans: 'ROCKET', opts: ['ROCKET', 'ROKET', 'ROCKIT', 'ROKETT'], exp: 'R-O-C-K-E-T uses C-K together.' },
        { emoji: '🌻', prompt: 'Choose the correct spelling for this bright yellow bloom:', ans: 'FLOWER', opts: ['FLOWER', 'FLOWR', 'FLOUER', 'FLOWERY'], exp: 'F-L-O-W-E-R.' },
        { emoji: '🐬', prompt: 'Pick the right spelling for this clever ocean swimmer:', ans: 'DOLPHIN', opts: ['DOLPHIN', 'DOLFIN', 'DOLPHEN', 'DOPLHIN'], exp: 'P-H makes the /f/ sound in D-O-L-P-H-I-N!' },
        { emoji: '🍎', prompt: 'Which spelling matches this crunchy red fruit?', ans: 'APPLE', opts: ['APPLE', 'APLE', 'APPEL', 'APLL'], exp: 'A-P-P-L-E has a double P.' },
        { emoji: '🎈', prompt: 'Choose the right spelling for a party float:', ans: 'BALLOON', opts: ['BALLOON', 'BALOON', 'BALLON', 'BALOONE'], exp: 'B-A-L-L-O-O-N has double L and double O!' },
        { emoji: '📚', prompt: 'Pick the correct word for a place full of books:', ans: 'LIBRARY', opts: ['LIBRARY', 'LIBERY', 'LIBARY', 'LIBRARI'], exp: 'L-I-B-R-A-R-Y has two Rs!' },
        { emoji: '🐧', prompt: 'Which spelling matches this tuxedo Antarctic bird?', ans: 'PENGUIN', opts: ['PENGUIN', 'PINGUIN', 'PENGWIN', 'PENGUN'], exp: 'P-E-N-G-U-I-N.' },
      ]
    : [
        { emoji: '🔭', prompt: 'Select the correctly spelled word for an astronomy instrument:', ans: 'TELESCOPE', opts: ['TELESCOPE', 'TELESCOP', 'TELLESCOPE', 'TELISCOPE'], exp: 'Tele (far) + scope (look) = TELESCOPE.' },
        { emoji: '🌿', prompt: 'Which word describes how plants make food from sunlight?', ans: 'PHOTOSYNTHESIS', opts: ['PHOTOSYNTHESIS', 'FOTOSYNTHESIS', 'PHOTOSINTHESIS', 'PHOTOSYNTHESES'], exp: 'P-H-O-T-O-S-Y-N-T-H-E-S-I-S.' },
        { emoji: '🌍', prompt: 'Choose the correct spelling for the layer of air around Earth:', ans: 'ATMOSPHERE', opts: ['ATMOSPHERE', 'ATMOSFERE', 'ATMOSPHER', 'ATMOSPHIRE'], exp: 'A-T-M-O-S-P-H-E-R-E.' },
        { emoji: '🧭', prompt: 'Select the right spelling for finding your way across maps:', ans: 'NAVIGATION', opts: ['NAVIGATION', 'NAVEGATION', 'NAVIGATON', 'NAVAGATION'], exp: 'N-A-V-I-G-A-T-I-O-N.' },
        { emoji: '⚡', prompt: 'Pick the correct spelling for electrical energy flow:', ans: 'ELECTRICITY', opts: ['ELECTRICITY', 'ELECTRISITY', 'ELECTRECITY', 'ELEKTRICITY'], exp: 'E-L-E-C-T-R-I-C-I-T-Y.' },
        { emoji: '🦖', prompt: 'Which word means a scientist who studies ancient fossils?', ans: 'PALEONTOLOGIST', opts: ['PALEONTOLOGIST', 'PALIONTOLOGIST', 'PALEONTOLAGIST', 'PALEONTOLIGIST'], exp: 'P-A-L-E-O-N-T-O-L-O-G-I-S-T.' },
        { emoji: '💧', prompt: 'Select the correct spelling for water turning into vapor:', ans: 'EVAPORATION', opts: ['EVAPORATION', 'EVAPORATIONE', 'EVAPORATON', 'EVAPURATION'], exp: 'E-V-A-P-O-R-A-T-I-O-N.' },
        { emoji: '🌋', prompt: 'Pick the right spelling for an erupting mountain:', ans: 'VOLCANO', opts: ['VOLCANO', 'VOLCANNO', 'VALCANO', 'VOLCENO'], exp: 'V-O-L-C-A-N-O.' },
        { emoji: '🧩', prompt: 'Choose the right spelling for a clever puzzling mystery:', ans: 'LABYRINTH', opts: ['LABYRINTH', 'LABIRINTH', 'LABYRINTHS', 'LABERYNTH'], exp: 'L-A-B-Y-R-I-N-T-H uses a Y.' },
        { emoji: '🌌', prompt: 'Which word describes our giant Milky Way star system?', ans: 'GALAXY', opts: ['GALAXY', 'GALAXIE', 'GALLAXY', 'GALEXY'], exp: 'G-A-L-A-X-Y.' },
      ];

  return spellingSet.map((s, idx) => ({
    id: `spl-${ageGroup}-${idx}`,
    ageGroups: [ageGroup],
    prompt: s.prompt,
    visual: { kind: 'word', primaryValue: s.emoji, secondaryValue: 'Spelling Check' },
    options: s.opts.map((o) => ({ id: o, label: o })),
    correctOptionId: s.ans,
    explanation: s.exp,
  }));
}

function buildScienceQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const items = [
      { prompt: 'What falls from gray rain clouds?', emoji: '🌧️', ans: 'Rain', opts: ['Rain', 'Candy', 'Sand'], exp: 'Clouds hold tiny water drops that fall as rain!' },
      { prompt: 'What bright star warms our Earth every day?', emoji: '☀️', ans: 'The Sun', opts: ['The Sun', 'A Lamp', 'Snow'], exp: 'The Sun gives Earth light and cozy warmth!' },
      { prompt: 'What do green plants drink through their roots?', emoji: '🌱', ans: 'Water', opts: ['Water', 'Juice', 'Milk'], exp: 'Roots sip water from the soil to help plants grow!' },
      { prompt: 'Which part of your body helps you see colors?', emoji: '👀', ans: 'Eyes', opts: ['Eyes', 'Knees', 'Elbows'], exp: 'Our eyes let us see shapes, faces, and rainbows!' },
      { prompt: 'Which part of your body beats like a drum inside your chest?', emoji: '❤️', ans: 'Heart', opts: ['Heart', 'Hat', 'Shoe'], exp: 'Your heart pumps blood all around your body!' },
      { prompt: 'What cold white flakes fall in winter?', emoji: '❄️', ans: 'Snow', opts: ['Snow', 'Leaves', 'Butterflies'], exp: 'When clouds are super cold, water freezes into snow!' },
      { prompt: 'What grows into a tall tree when planted in soil?', emoji: '🌰', ans: 'A Seed', opts: ['A Seed', 'A Rock', 'A Spoon'], exp: 'Tiny seeds sprout leaves and grow into big trees!' },
      { prompt: 'Which sense do your ears help you use?', emoji: '👂', ans: 'Hearing', opts: ['Hearing', 'Tasting', 'Jumping'], exp: 'Our ears hear music, laughter, and bird songs!' },
      { prompt: 'What colorful arch appears after rain and sunshine?', emoji: '🌈', ans: 'Rainbow', opts: ['Rainbow', 'Blanket', 'Cloud'], exp: 'Sunlight shining through raindrops creates a rainbow!' },
      { prompt: 'What do bees visit flowers to collect?', emoji: '🐝', ans: 'Nectar', opts: ['Nectar', 'Pebbles', 'Snow'], exp: 'Bees sip sweet nectar to make yummy honey!' },
    ];
    return items.map((q, idx) => ({
      id: `sci-l-${idx}`,
      ageGroups: ['little'],
      prompt: q.prompt,
      voicePrompt: q.prompt,
      visual: { kind: 'science', primaryValue: q.emoji, secondaryValue: 'Nature Discovery' },
      options: q.opts.map((o) => ({ id: o, label: o })),
      correctOptionId: q.ans,
      explanation: q.exp,
    }));
  }

  const bank = ageGroup === 'smart'
    ? [
        { emoji: '💧', prompt: 'In the water cycle, what happens when sun warms ocean water into vapor?', ans: 'Evaporation', opts: ['Evaporation', 'Freezing', 'Melting', 'Shadow'], exp: 'Evaporation turns liquid water into invisible water vapor that rises!' },
        { emoji: '☁️', prompt: 'When water vapor cools high in the sky to form clouds, it is called:', ans: 'Condensation', opts: ['Condensation', 'Digestion', 'Friction', 'Rotation'], exp: 'Cooling vapor condenses into tiny cloud droplets.' },
        { emoji: '🌱', prompt: 'Which part of a plant makes food using sunlight?', ans: 'Leaves', opts: ['Leaves', 'Roots', 'Seeds', 'Bark'], exp: 'Green leaves capture sunlight to make sugar for the plant!' },
        { emoji: '🦴', prompt: 'What gives the human body its sturdy shape and protects organs?', ans: 'Skeleton', opts: ['Skeleton', 'Hair', 'Skin', 'Nails'], exp: 'An adult human skeleton has 206 bones working together!' },
        { emoji: '🦋', prompt: 'What is a caterpillar before it transforms into a butterfly?', ans: 'Larva', opts: ['Larva', 'Root', 'Seed', 'Mineral'], exp: 'A caterpillar is the larva stage before forming a chrysalis.' },
        { emoji: '🌬️', prompt: 'Moving air across Earth’s surface is called:', ans: 'Wind', opts: ['Wind', 'Tide', 'Lava', 'Gravity'], exp: 'Wind blows when warm air rises and cooler air rushes in!' },
        { emoji: '🧲', prompt: 'Which metal do magnets strongly attract?', ans: 'Iron', opts: ['Iron', 'Wood', 'Plastic', 'Glass'], exp: 'Iron, nickel, and cobalt are magnetic metals!' },
        { emoji: '🫁', prompt: 'Which organ fills with fresh oxygen every time you breathe in?', ans: 'Lungs', opts: ['Lungs', 'Stomach', 'Brain', 'Kidney'], exp: 'Your two lungs bring oxygen into your bloodstream.' },
        { emoji: '🌡️', prompt: 'Which tool measures how hot or cold the weather is?', ans: 'Thermometer', opts: ['Thermometer', 'Compass', 'Telescope', 'Ruler'], exp: 'Thermometers measure temperature in Celsius or Fahrenheit.' },
        { emoji: '🌧️', prompt: 'Rain, snow, sleet, and hail falling from clouds are all forms of:', ans: 'Precipitation', opts: ['Precipitation', 'Reflection', 'Magnetism', 'Gravity'], exp: 'Precipitation happens when cloud droplets grow heavy and fall!' },
      ]
    : [
        { emoji: '🌿', prompt: 'Which gas do green plants absorb during photosynthesis and release oxygen?', ans: 'Carbon dioxide (CO₂)', opts: ['Carbon dioxide (CO₂)', 'Nitrogen', 'Helium', 'Argon'], exp: 'Plants convert CO₂ and water into glucose using solar energy, releasing O₂!' },
        { emoji: '⚡', prompt: 'Which subatomic particle carries a negative electric charge?', ans: 'Electron', opts: ['Electron', 'Proton', 'Neutron', 'Photon'], exp: 'Electrons carry negative charge, protons positive, and neutrons are neutral.' },
        { emoji: '🌊', prompt: 'What force from the Moon primarily drives Earth’s ocean tides?', ans: 'Gravity', opts: ['Gravity', 'Magnetism', 'Wind', 'Friction'], exp: 'The Moon’s gravitational pull creates tidal bulges in Earth’s oceans.' },
        { emoji: '🩸', prompt: 'Which blood cells carry oxygen from your lungs to muscles?', ans: 'Red blood cells', opts: ['Red blood cells', 'Platelets', 'Neurons', 'White blood cells'], exp: 'Hemoglobin inside red blood cells binds and transports oxygen!' },
        { emoji: '🌋', prompt: 'What type of rock forms when cooled lava or magma hardens?', ans: 'Igneous rock', opts: ['Igneous rock', 'Sedimentary rock', 'Metamorphic rock', 'Limestone'], exp: 'Igneous means "fire-born" — formed from cooled molten magma or lava.' },
        { emoji: '♻️', prompt: 'Why are rainforests often called the "lungs of the Earth"?', ans: 'They absorb vast CO₂ and produce oxygen', opts: ['They absorb vast CO₂ and produce oxygen', 'They store icebergs', 'They block sunlight', 'They make ocean salt'], exp: 'Dense tropical forests cycle enormous amounts of carbon and moisture.' },
        { emoji: '🧠', prompt: 'Which part of the brain coordinates balance and smooth movement?', ans: 'Cerebellum', opts: ['Cerebellum', 'Eardrum', 'Retina', 'Trachea'], exp: 'The cerebellum fine-tunes posture, balance, and coordination.' },
        { emoji: '🔊', prompt: 'Why can sound NOT travel through outer space?', ans: 'Space is a vacuum with almost no particles', opts: ['Space is a vacuum with almost no particles', 'Space is too bright', 'Gravity stops sound', 'Planets absorb echoes'], exp: 'Sound waves need a medium (air, water, or solid) to vibrate!' },
        { emoji: '🔋', prompt: 'A solar panel converts sunlight directly into:', ans: 'Electrical energy', opts: ['Electrical energy', 'Sound waves', 'Nuclear fuel', 'Thermal steam'], exp: 'Photovoltaic cells turn photons of light into electric current.' },
        { emoji: '🧊', prompt: 'At standard sea-level pressure, at what temperature does pure water freeze?', ans: '0°C (32°F)', opts: ['0°C (32°F)', '50°C (122°F)', '100°C (212°F)', '-50°C (-58°F)'], exp: 'Pure water freezes at 0°C and boils at 100°C at sea level!' },
      ];

  return bank.map((q, idx) => ({
    id: `sci-${ageGroup}-${idx}`,
    ageGroups: [ageGroup],
    prompt: q.prompt,
    visual: { kind: 'science', primaryValue: q.emoji, secondaryValue: 'Science Discovery' },
    options: q.opts.map((o) => ({ id: o, label: o })),
    correctOptionId: q.ans,
    explanation: q.exp,
  }));
}

function buildPlanetQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const items = [
      { prompt: 'Which bright circle shines in the sky during the day?', emoji: '☀️', ans: 'Sun', opts: ['Sun', 'Moon', 'Rock'], exp: 'The Sun brings bright daytime!' },
      { prompt: 'Which glowing friend visits the night sky and changes shape?', emoji: '🌙', ans: 'Moon', opts: ['Moon', 'Bus', 'Tree'], exp: 'The Moon orbits our Earth and glows with reflected sunlight!' },
      { prompt: 'Which blue and green planet is our home?', emoji: '🌍', ans: 'Earth', opts: ['Earth', 'Mars', 'Saturn'], exp: 'Earth is our home with oceans, trees, and animals!' },
      { prompt: 'What zooms astronauts up into outer space?', emoji: '🚀', ans: 'Rocket', opts: ['Rocket', 'Bicycle', 'Boat'], exp: 'Rockets blast off with roaring boosters to reach space!' },
      { prompt: 'Which planet has giant pretty rings around it?', emoji: '🪐', ans: 'Saturn', opts: ['Saturn', 'Earth', 'Moon'], exp: 'Saturn wears sparkling icy rings!' },
      { prompt: 'What twinkles like tiny diamonds at night?', emoji: '⭐', ans: 'Stars', opts: ['Stars', 'Clouds', 'Puddles'], exp: 'Stars are giant glowing suns very far away!' },
      { prompt: 'Which red dusty planet is called the Red Planet?', emoji: '🔴', ans: 'Mars', opts: ['Mars', 'Earth', 'Sun'], exp: 'Mars looks rusty red because of iron dust on its surface!' },
      { prompt: 'Who wears a space suit and floats in zero gravity?', emoji: '👩‍🚀', ans: 'Astronaut', opts: ['Astronaut', 'Baker', 'Swimmer'], exp: 'Astronauts explore space stations and science labs!' },
      { prompt: 'What shape is our planet Earth?', emoji: '🌐', ans: 'Round Sphere', opts: ['Round Sphere', 'Flat Square', 'Triangle'], exp: 'Earth is a giant round ball floating in space!' },
      { prompt: 'What helps scientists see far-away stars up close?', emoji: '🔭', ans: 'Telescope', opts: ['Telescope', 'Spoon', 'Umbrella'], exp: 'Telescopes gather starlight so we can spot craters and planets!' },
    ];
    return items.map((q, idx) => ({
      id: `pln-l-${idx}`,
      ageGroups: ['little'],
      prompt: q.prompt,
      voicePrompt: q.prompt,
      visual: { kind: 'planet', primaryValue: q.emoji, secondaryValue: 'Little Astronaut' },
      options: q.opts.map((o) => ({ id: o, label: o })),
      correctOptionId: q.ans,
      explanation: q.exp,
    }));
  }

  const bank = ageGroup === 'smart'
    ? [
        { emoji: '☀️', prompt: 'Which planet is closest to the Sun?', ans: 'Mercury', opts: ['Mercury', 'Venus', 'Earth', 'Mars'], exp: 'Mercury zooms around the Sun in just 88 Earth days!' },
        { emoji: '🪐', prompt: 'Which planet is famous for its wide, bright icy rings?', ans: 'Saturn', opts: ['Saturn', 'Mars', 'Mercury', 'Uranus'], exp: 'Saturn’s rings are made of billions of ice and rock chunks.' },
        { emoji: '🔴', prompt: 'Which planet is known as the "Red Planet"?', ans: 'Mars', opts: ['Mars', 'Jupiter', 'Neptune', 'Venus'], exp: 'Iron oxide (rust) in Martian soil gives Mars its red glow!' },
        { emoji: '🟠', prompt: 'Which is the largest planet in our Solar System?', ans: 'Jupiter', opts: ['Jupiter', 'Earth', 'Saturn', 'Venus'], exp: 'Jupiter is so huge that over 1,300 Earths could fit inside it!' },
        { emoji: '🌍', prompt: 'Earth is the ___ planet from the Sun.', ans: '3rd', opts: ['1st', '2nd', '3rd', '4th'], exp: 'Mercury (1st), Venus (2nd), Earth (3rd)!' },
        { emoji: '🔵', prompt: 'Which deep blue planet is farthest from the Sun?', ans: 'Neptune', opts: ['Neptune', 'Mars', 'Venus', 'Saturn'], exp: 'Neptune is an ice giant swept by the fastest winds in the Solar System.' },
        { emoji: '✨', prompt: 'Why is Venus the hottest planet even though Mercury is closer to the Sun?', ans: 'Its thick atmosphere traps heat', opts: ['Its thick atmosphere traps heat', 'It has more volcanoes erupting daily', 'It spins faster', 'It is closer to Jupiter'], exp: 'Venus has a dense carbon dioxide blanket that creates a strong greenhouse effect!' },
        { emoji: '🌙', prompt: 'How long does it take the Moon to orbit Earth once?', ans: 'About 27–29 days', opts: ['About 27–29 days', '1 day', '365 days', '7 days'], exp: 'One lunar cycle takes about a month—that is where the word "month" comes from!' },
        { emoji: '☄️', prompt: 'What icy space visitor grows a glowing tail near the Sun?', ans: 'Comet', opts: ['Comet', 'Asteroid', 'Meteorite', 'Moon'], exp: 'As a comet warms near the Sun, ice turns to gas and forms a bright tail.' },
        { emoji: '🌌', prompt: 'What is the name of the galaxy that holds our Solar System?', ans: 'Milky Way', opts: ['Milky Way', 'Andromeda', 'Orion Belt', 'Big Dipper'], exp: 'We live in a spiral galaxy called the Milky Way!' },
      ]
    : [
        { emoji: '🪨', prompt: 'Between which two planets does the main Asteroid Belt orbit?', ans: 'Mars and Jupiter', opts: ['Mars and Jupiter', 'Earth and Mars', 'Venus and Earth', 'Saturn and Uranus'], exp: 'Rocky leftovers from planet formation orbit between Mars and Jupiter.' },
        { emoji: '💫', prompt: 'Which planet rotates on its side at an extreme 98-degree tilt?', ans: 'Uranus', opts: ['Uranus', 'Neptune', 'Jupiter', 'Mercury'], exp: 'Uranus rolls around the Sun sideways, causing 42-year-long seasons!' },
        { emoji: '🌋', prompt: 'Olympus Mons, the tallest volcano in the Solar System, is on:', ans: 'Mars', opts: ['Mars', 'Venus', 'Mercury', 'Io'], exp: 'Olympus Mons on Mars is nearly three times taller than Mount Everest!' },
        { emoji: '🌪️', prompt: 'What is Jupiter’s famous Great Red Spot?', ans: 'A giant centuries-old storm', opts: ['A giant centuries-old storm', 'An active lava lake', 'A massive crater', 'A copper mountain'], exp: 'The Great Red Spot is a raging storm wider than planet Earth!' },
        { emoji: '☀️', prompt: 'About how long does sunlight take to travel from the Sun to Earth?', ans: '8 minutes 20 seconds', opts: ['8 minutes 20 seconds', '1 second', '2 hours', '1 day'], exp: 'Light travels at ~300,000 km/s across 150 million km in ~8.3 minutes.' },
        { emoji: '🌑', prompt: 'What occurs when the Moon passes directly between the Sun and Earth?', ans: 'Solar eclipse', opts: ['Solar eclipse', 'Lunar eclipse', 'Equinox', 'Solstice'], exp: 'During a solar eclipse, the Moon casts its shadow onto Earth.' },
        { emoji: '🛰️', prompt: 'Which moon of Saturn has thick nitrogen air and liquid methane lakes?', ans: 'Titan', opts: ['Titan', 'Europa', 'Phobos', 'Triton'], exp: 'Titan is Saturn’s largest moon and has rivers and lakes of liquid hydrocarbons.' },
        { emoji: '🧊', prompt: 'Which icy moon of Jupiter hides a vast salty ocean beneath its crust?', ans: 'Europa', opts: ['Europa', 'Deimos', 'Charon', 'Miranda'], exp: 'Scientists study Europa as a prime candidate for subsurface ocean life.' },
        { emoji: '⭐', prompt: 'How are stars like our Sun powered at their core?', ans: 'Nuclear fusion of hydrogen into helium', opts: ['Nuclear fusion of hydrogen into helium', 'Burning coal gas', 'Chemical batteries', 'Volcanic magma'], exp: 'Extreme pressure fuses hydrogen atoms into helium, releasing immense light!' },
        { emoji: '🔭', prompt: 'What unit measures the distance light travels in one Earth year?', ans: 'Light-year', opts: ['Light-year', 'Astronomical mile', 'Parsec second', 'Solar arc'], exp: 'One light-year is about 9.46 trillion kilometers!' },
      ];

  return bank.map((q, idx) => ({
    id: `pln-${ageGroup}-${idx}`,
    ageGroups: [ageGroup],
    prompt: q.prompt,
    visual: { kind: 'planet', primaryValue: q.emoji, secondaryValue: 'Solar System' },
    options: q.opts.map((o) => ({ id: o, label: o })),
    correctOptionId: q.ans,
    explanation: q.exp,
  }));
}

function buildGeographyQuestions(ageGroup: AgeGroup): QuestionItem[] {
  if (ageGroup === 'little') {
    const items = [
      { prompt: 'Where does a whale swim?', emoji: '🐳', ans: 'Ocean', opts: ['Ocean', 'Desert', 'Tree'], exp: 'Whales swim happily in deep blue oceans!' },
      { prompt: 'Where does a polar bear live?', emoji: '🐻‍❄️', ans: 'Icy Snow', opts: ['Icy Snow', 'Jungle', 'Pond'], exp: 'Polar bears have thick fur to stay warm on Arctic ice!' },
      { prompt: 'Where does a camel walk on warm sand?', emoji: '🐪', ans: 'Desert', opts: ['Desert', 'Ocean', 'Cloud'], exp: 'Camels live in sunny sandy deserts!' },
      { prompt: 'Where do monkeys swing from tall branches?', emoji: '🐒', ans: 'Jungle Trees', opts: ['Jungle Trees', 'Icebergs', 'Caves'], exp: 'Monkeys love swinging through leafy jungle trees!' },
      { prompt: 'Where does a little green frog hop?', emoji: '🐸', ans: 'Pond', opts: ['Pond', 'Volcano', 'Moon'], exp: 'Frogs live near cool ponds with lily pads!' },
      { prompt: 'Where does a cow munch on green grass?', emoji: '🐮', ans: 'Farm Meadow', opts: ['Farm Meadow', 'Deep Ocean', 'Space'], exp: 'Cows graze in sunny farm pastures!' },
      { prompt: 'Where do colorful coral fish swim?', emoji: '🐠', ans: 'Coral Reef', opts: ['Coral Reef', 'Mountain Top', 'Desert'], exp: 'Coral reefs under the sea are homes for bright fish!' },
      { prompt: 'Where does a penguin waddle?', emoji: '🐧', ans: 'Snowy Coast', opts: ['Snowy Coast', 'Hot Desert', 'Treehouse'], exp: 'Penguins love icy coasts and chilly ocean swims!' },
      { prompt: 'Where do owls build cozy nests?', emoji: '🦉', ans: 'Forest Tree', opts: ['Forest Tree', 'Sandy Beach', 'Subway'], exp: 'Forest trees give owls safe branches and hollows!' },
      { prompt: 'Where does a crab scuttle sideways?', emoji: '🦀', ans: 'Sandy Beach', opts: ['Sandy Beach', 'Snowy Mountain', 'Cloud'], exp: 'Crabs scuttle along sandy ocean beaches!' },
    ];
    return items.map((q, idx) => ({
      id: `geo-l-${idx}`,
      ageGroups: ['little'],
      prompt: q.prompt,
      voicePrompt: q.prompt,
      visual: { kind: 'geography', primaryValue: q.emoji, secondaryValue: 'Animal Homes' },
      options: q.opts.map((o) => ({ id: o, label: o })),
      correctOptionId: q.ans,
      explanation: q.exp,
    }));
  }

  const bank = ageGroup === 'smart'
    ? [
        { emoji: '🌍', prompt: 'How many continents are there on Earth?', ans: '7', opts: ['5', '6', '7', '9'], exp: 'Asia, Africa, North America, South America, Antarctica, Europe, and Australia!' },
        { emoji: '🌊', prompt: 'Which is the largest ocean on Earth?', ans: 'Pacific Ocean', opts: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], exp: 'The Pacific Ocean covers nearly one-third of Earth’s entire surface!' },
        { emoji: '🦒', prompt: 'On which continent do wild giraffes and zebras roam?', ans: 'Africa', opts: ['Africa', 'Europe', 'Antarctica', 'Australia'], exp: 'Savannas in Africa are home to giraffes, lions, and zebras!' },
        { emoji: '🦘', prompt: 'Which continent is famous for kangaroos and koalas?', ans: 'Australia', opts: ['Australia', 'Asia', 'South America', 'Europe'], exp: 'Australia is home to unique marsupials like kangaroos and koalas!' },
        { emoji: '❄️', prompt: 'Which frozen continent sits at the South Pole?', ans: 'Antarctica', opts: ['Antarctica', 'Europe', 'Africa', 'Asia'], exp: 'Antarctica is Earth’s icy southernmost continent!' },
        { emoji: '🐼', prompt: 'Giant pandas live in bamboo forests on which continent?', ans: 'Asia', opts: ['Asia', 'Africa', 'North America', 'Australia'], exp: 'Wild giant pandas live in misty mountain bamboo forests in China, Asia!' },
        { emoji: '🧭', prompt: 'On most maps, which direction points straight up?', ans: 'North', opts: ['North', 'South', 'East', 'West'], exp: 'A map compass rose usually places North at the top!' },
        { emoji: '🌴', prompt: 'What is a piece of land surrounded completely by water called?', ans: 'Island', opts: ['Island', 'Peninsula', 'Valley', 'Plateau'], exp: 'An island is completely surrounded by water on every side!' },
        { emoji: '⛰️', prompt: 'What is the tallest mountain peak above sea level?', ans: 'Mount Everest', opts: ['Mount Everest', 'Mount Fuji', 'Kilimanjaro', 'Mont Blanc'], exp: 'Mount Everest in the Himalayas rises 8,849 meters high!' },
        { emoji: '🌴', prompt: 'Which huge rainforest stretches across South America?', ans: 'Amazon Rainforest', opts: ['Amazon Rainforest', 'Sahara', 'Tundra', 'Everglades'], exp: 'The Amazon is the largest tropical rainforest on Earth!' },
      ]
    : [
        { emoji: '🌊', prompt: 'Which river flows through Egypt and is among the longest on Earth?', ans: 'Nile River', opts: ['Nile River', 'Thames River', 'Danube River', 'Mississippi River'], exp: 'The Nile flows northward across northeastern Africa into the Mediterranean.' },
        { emoji: '🏔️', prompt: 'Which mountain range separates India and Nepal from the Tibetan Plateau?', ans: 'Himalayas', opts: ['Himalayas', 'Andes', 'Alps', 'Rockies'], exp: 'The Himalayas formed as the Indian tectonic plate collided with Eurasia.' },
        { emoji: '🌍', prompt: 'What imaginary 0° latitude line divides Northern and Southern Hemispheres?', ans: 'Equator', opts: ['Equator', 'Prime Meridian', 'Tropic of Cancer', 'Arctic Circle'], exp: 'The Equator circles the widest middle of Earth at 0° latitude.' },
        { emoji: '🏜️', prompt: 'Which is the largest hot desert in the world?', ans: 'Sahara Desert', opts: ['Sahara Desert', 'Gobi Desert', 'Mojave Desert', 'Atacama Desert'], exp: 'The Sahara spans much of North Africa across millions of square kilometers.' },
        { emoji: '🌏', prompt: 'Which continent has the largest land area and highest population?', ans: 'Asia', opts: ['Asia', 'Africa', 'North America', 'Europe'], exp: 'Asia covers ~30% of Earth’s land and holds over half of humanity.' },
        { emoji: '🌋', prompt: 'Why is the rim around the Pacific Ocean called the "Ring of Fire"?', ans: 'Frequent earthquakes and volcanoes', opts: ['Frequent earthquakes and volcanoes', 'Warmest ocean water', 'Bright coral reefs', 'Giant desert winds'], exp: 'Tectonic plate boundaries around the Pacific create active volcanoes and quakes.' },
        { emoji: '🌳', prompt: 'Which ocean lies between the Americas and Europe/Africa?', ans: 'Atlantic Ocean', opts: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Southern Ocean'], exp: 'The Atlantic is Earth’s second-largest ocean.' },
        { emoji: '🗺️', prompt: 'What is a narrow strip of land connecting two larger landmasses?', ans: 'Isthmus', opts: ['Isthmus', 'Archipelago', 'Delta', 'Fjord'], exp: 'Panama is a famous isthmus linking North and South America!' },
        { emoji: '❄️', prompt: 'Which island country is famous for geysers, glaciers, and geothermal power?', ans: 'Iceland', opts: ['Iceland', 'Madagascar', 'Japan', 'Fiji'], exp: 'Iceland uses underground volcanic heat to warm homes and generate clean power!' },
        { emoji: '🌿', prompt: 'What do we call a group or chain of many islands together?', ans: 'Archipelago', opts: ['Archipelago', 'Canyon', 'Glacier', 'Savanna'], exp: 'Japan, Indonesia, and Hawaii are famous archipelagos!' },
      ];

  return bank.map((q, idx) => ({
    id: `geo-${ageGroup}-${idx}`,
    ageGroups: [ageGroup],
    prompt: q.prompt,
    visual: { kind: 'geography', primaryValue: q.emoji, secondaryValue: 'World Explorer' },
    options: q.opts.map((o) => ({ id: o, label: o })),
    correctOptionId: q.ans,
    explanation: q.exp,
  }));
}

export function getQuizQuestionsForGame(
  gameId: MiniGameId,
  ageGroup: AgeGroup,
): QuestionItem[] {
  switch (gameId) {
    case 'animal-sound-detective':
      return ageGroup === 'little' ? ANIMAL_SOUNDS_LITTLE : ANIMAL_SOUNDS_OLDER;
    case 'color-matching':
      return buildColorQuestions(ageGroup);
    case 'shape-explorer':
      return buildShapeQuestions(ageGroup);
    case 'addition-adventure':
      return buildAdditionQuestions(ageGroup);
    case 'subtraction-challenge':
      return buildSubtractionQuestions(ageGroup);
    case 'pattern-detective':
      return buildPatternQuestions(ageGroup);
    case 'spelling-adventure':
      return buildSpellingQuestions(ageGroup);
    case 'science-quiz':
      return buildScienceQuestions(ageGroup);
    case 'planet-explorer-quiz':
      return buildPlanetQuestions(ageGroup);
    case 'geography-challenge':
      return buildGeographyQuestions(ageGroup);
    default:
      return [];
  }
}

export function getWordBuilderRounds(ageGroup: AgeGroup): WordChallenge[] {
  if (ageGroup === 'little') {
    return [
      { id: 'wb-l-1', word: 'CAT', clue: 'Furry pet that says meow', emoji: '🐱', ageGroups: ['little'] },
      { id: 'wb-l-2', word: 'DOG', clue: 'Friendly puppy that wags its tail', emoji: '🐶', ageGroups: ['little'] },
      { id: 'wb-l-3', word: 'SUN', clue: 'Warm yellow light in the sky', emoji: '☀️', ageGroups: ['little'] },
      { id: 'wb-l-4', word: 'BUS', clue: 'Big yellow ride to school', emoji: '🚌', ageGroups: ['little'] },
      { id: 'wb-l-5', word: 'HAT', clue: 'Worn on your head', emoji: '👒', ageGroups: ['little'] },
      { id: 'wb-l-6', word: 'BEE', clue: 'Buzzing insect that makes honey', emoji: '🐝', ageGroups: ['little'] },
      { id: 'wb-l-7', word: 'FOX', clue: 'Clever orange forest animal', emoji: '🦊', ageGroups: ['little'] },
      { id: 'wb-l-8', word: 'CUP', clue: 'Used for drinking water', emoji: '🥤', ageGroups: ['little'] },
      { id: 'wb-l-9', word: 'OWL', clue: 'Night bird that hoots', emoji: '🦉', ageGroups: ['little'] },
      { id: 'wb-l-10', word: 'CAR', clue: 'Four wheels going beep-beep', emoji: '🚗', ageGroups: ['little'] },
    ];
  }
  if (ageGroup === 'smart') {
    return [
      { id: 'wb-s-1', word: 'STAR', clue: 'Twinkles high in the night sky', emoji: '⭐', ageGroups: ['smart'] },
      { id: 'wb-s-2', word: 'TREE', clue: 'Tall plant with trunk and leaves', emoji: '🌳', ageGroups: ['smart'] },
      { id: 'wb-s-3', word: 'FROG', clue: 'Green pond jumper', emoji: '🐸', ageGroups: ['smart'] },
      { id: 'wb-s-4', word: 'MOON', clue: 'Orbits around Earth at night', emoji: '🌙', ageGroups: ['smart'] },
      { id: 'wb-s-5', word: 'APPLE', clue: 'Crunchy red orchard fruit', emoji: '🍎', ageGroups: ['smart'] },
      { id: 'wb-s-6', word: 'CLOUD', clue: 'Fluffy water droplets in the sky', emoji: '☁️', ageGroups: ['smart'] },
      { id: 'wb-s-7', word: 'ROBOT', clue: 'Friendly helper like Wally!', emoji: '🤖', ageGroups: ['smart'] },
      { id: 'wb-s-8', word: 'EARTH', clue: 'Our blue-and-green home planet', emoji: '🌍', ageGroups: ['smart'] },
      { id: 'wb-s-9', word: 'TRAIN', clue: 'Rides along steel railway tracks', emoji: '🚂', ageGroups: ['smart'] },
      { id: 'wb-s-10', word: 'WHALE', clue: 'Giant gentle ocean mammal', emoji: '🐳', ageGroups: ['smart'] },
    ];
  }
  return [
    { id: 'wb-sup-1', word: 'PLANET', clue: 'Large world orbiting a star', emoji: '🪐', ageGroups: ['super'] },
    { id: 'wb-sup-2', word: 'GALAXY', clue: 'Billions of stars bound together', emoji: '🌌', ageGroups: ['super'] },
    { id: 'wb-sup-3', word: 'ROCKET', clue: 'Spacecraft launched with thrust', emoji: '🚀', ageGroups: ['super'] },
    { id: 'wb-sup-4', word: 'FOREST', clue: 'Dense woodland ecosystem', emoji: '🌲', ageGroups: ['super'] },
    { id: 'wb-sup-5', word: 'ISLAND', clue: 'Land completely surrounded by water', emoji: '🏝️', ageGroups: ['super'] },
    { id: 'wb-sup-6', word: 'COMPASS', clue: 'Navigation tool pointing north', emoji: '🧭', ageGroups: ['super'] },
    { id: 'wb-sup-7', word: 'RAINBOW', clue: 'Light spectrum arc after rain', emoji: '🌈', ageGroups: ['super'] },
    { id: 'wb-sup-8', word: 'VOLCANO', clue: 'Mountain formed by rising magma', emoji: '🌋', ageGroups: ['super'] },
    { id: 'wb-sup-9', word: 'SCIENCE', clue: 'Observing and testing how nature works', emoji: '🔬', ageGroups: ['super'] },
    { id: 'wb-sup-10', word: 'MYSTERY', clue: 'Puzzle waiting to be solved', emoji: '🔍', ageGroups: ['super'] },
  ];
}

export function getMissingObjectRounds(ageGroup: AgeGroup): MissingObjectRound[] {
  const pool = [
    { id: 'acorn', name: 'Acorn', emoji: '🌰' },
    { id: 'mushroom', name: 'Mushroom', emoji: '🍄' },
    { id: 'owl', name: 'Wise Owl', emoji: '🦉' },
    { id: 'compass', name: 'Golden Compass', emoji: '🧭' },
    { id: 'lantern', name: 'Lantern', emoji: '🏮' },
    { id: 'leaf', name: 'Maple Leaf', emoji: '🍁' },
    { id: 'butterfly', name: 'Butterfly', emoji: '🦋' },
    { id: 'key', name: 'Treasure Key', emoji: '🔑' },
    { id: 'gem', name: 'Crystal Gem', emoji: '💎' },
    { id: 'telescope', name: 'Telescope', emoji: '🔭' },
    { id: 'snail', name: 'Garden Snail', emoji: '🐌' },
    { id: 'clover', name: 'Four-Leaf Clover', emoji: '🍀' },
  ];

  const gridCount = ageGroup === 'little' ? 6 : ageGroup === 'smart' ? 9 : 12;

  return Array.from({ length: 10 }, (_, idx) => {
    const target = pool[idx % pool.length];
    const others = pool.filter((p) => p.id !== target.id).slice(0, gridCount - 1);
    const items = [...others];
    const insertAt = (idx * 3 + 1) % gridCount;
    items.splice(insertAt, 0, target);
    return {
      id: `mo-${ageGroup}-${idx}`,
      targetName: target.name,
      targetEmoji: target.emoji,
      clue:
        ageGroup === 'little'
          ? `Find the ${target.name}!`
          : `Search the Mystery Forest and tap the hidden ${target.name}.`,
      gridItems: items,
      ageGroups: [ageGroup],
    };
  });
}

export function getNumberCatcherRounds(ageGroup: AgeGroup): NumberCatcherRound[] {
  if (ageGroup === 'little') {
    return Array.from({ length: 10 }, (_, idx) => {
      const target = idx + 1;
      const distractors = [
        ((target + 1) % 10) + 1,
        ((target + 3) % 10) + 1,
        ((target + 6) % 10) + 1,
      ];
      return {
        id: `nc-l-${idx}`,
        prompt: `Catch the number ${target}!`,
        targetValue: target,
        distractors,
        ageGroups: ['little'],
      };
    });
  }

  if (ageGroup === 'smart') {
    const sums = [
      { prompt: 'Catch the answer to 3 + 4', target: 7, dist: [5, 6, 8, 9] },
      { prompt: 'Catch the answer to 5 + 5', target: 10, dist: [8, 9, 12, 15] },
      { prompt: 'Catch the answer to 9 − 3', target: 6, dist: [4, 5, 7, 8] },
      { prompt: 'Catch the next even number: 2, 4, 6, ?', target: 8, dist: [7, 9, 10, 12] },
      { prompt: 'Catch the answer to 8 + 7', target: 15, dist: [13, 14, 16, 17] },
      { prompt: 'Catch the answer to 12 − 4', target: 8, dist: [6, 7, 9, 10] },
      { prompt: 'Catch the answer to 10 + 9', target: 19, dist: [17, 18, 20, 21] },
      { prompt: 'Catch the answer to 14 − 5', target: 9, dist: [7, 8, 10, 11] },
      { prompt: 'Catch the next by 5s: 5, 10, 15, ?', target: 20, dist: [18, 19, 25, 30] },
      { prompt: 'Catch the answer to 11 + 11', target: 22, dist: [20, 21, 23, 24] },
    ];
    return sums.map((s, idx) => ({
      id: `nc-s-${idx}`,
      prompt: s.prompt,
      targetValue: s.target,
      distractors: s.dist,
      ageGroups: ['smart'],
    }));
  }

  const mults = [
    { prompt: 'Catch the product of 6 × 4', target: 24, dist: [18, 20, 28, 32] },
    { prompt: 'Catch the product of 7 × 5', target: 35, dist: [25, 30, 40, 42] },
    { prompt: 'Catch the quotient of 36 ÷ 6', target: 6, dist: [4, 5, 7, 8] },
    { prompt: 'Catch the product of 9 × 4', target: 36, dist: [27, 32, 40, 45] },
    { prompt: 'Catch the square of 7 (7 × 7)', target: 49, dist: [42, 48, 54, 56] },
    { prompt: 'Catch the quotient of 63 ÷ 9', target: 7, dist: [6, 8, 9, 12] },
    { prompt: 'Catch the product of 8 × 6', target: 48, dist: [42, 46, 54, 56] },
    { prompt: 'Catch the answer to (5 × 5) + 4', target: 29, dist: [25, 27, 31, 34] },
    { prompt: 'Catch the product of 12 × 3', target: 36, dist: [24, 30, 39, 48] },
    { prompt: 'Catch the quotient of 80 ÷ 8', target: 10, dist: [8, 9, 11, 12] },
  ];
  return mults.map((m, idx) => ({
    id: `nc-sup-${idx}`,
    prompt: m.prompt,
    targetValue: m.target,
    distractors: m.dist,
    ageGroups: ['super'],
  }));
}

export function getMemoryDeck(ageGroup: AgeGroup): MemoryPairItem[] {
  const allPairs: MemoryPairItem[] = [
    { id: 'lion', label: 'Lion', emoji: '🦁', bgHex: '#FEF3C7' },
    { id: 'owl', label: 'Owl', emoji: '🦉', bgHex: '#E0E7FF' },
    { id: 'rocket', label: 'Rocket', emoji: '🚀', bgHex: '#DBEAFE' },
    { id: 'rainbow', label: 'Rainbow', emoji: '🌈', bgHex: '#FCE7F3' },
    { id: 'frog', label: 'Frog', emoji: '🐸', bgHex: '#DCFCE7' },
    { id: 'star', label: 'Star', emoji: '⭐', bgHex: '#FEF9C3' },
    { id: 'planet', label: 'Planet', emoji: '🪐', bgHex: '#F3E8FF' },
    { id: 'whale', label: 'Whale', emoji: '🐳', bgHex: '#CFFAFE' },
  ];
  const pairCount = ageGroup === 'little' ? 4 : ageGroup === 'smart' ? 6 : 8;
  return allPairs.slice(0, pairCount);
}

export function getPicturePuzzlePresets(ageGroup: AgeGroup): PicturePuzzlePreset[] {
  const gridSize: 2 | 3 = ageGroup === 'little' ? 2 : 3;
  return [
    {
      id: 'pp-island',
      title: 'Sunny Island Mosaic',
      gridSize,
      themeColors: ['#57C7F2', '#FFD95A', '#8DE3B2', '#FF9566', '#B9A6F6', '#7DD3FC', '#A7F3D0', '#FDE68A', '#FDBA74'],
      symbols: ['☀️', '☁️', '🐦', '🌴', '🏝️', '🌊', '🐢', '🐚', '⛵'],
      ageGroups: ['little', 'smart', 'super'],
    },
    {
      id: 'pp-space',
      title: 'Cosmic Rocket Scene',
      gridSize,
      themeColors: ['#312E81', '#4338CA', '#5B21B6', '#6D28D9', '#7C3AED', '#2563EB', '#0284C7', '#0EA5E9', '#6366F1'],
      symbols: ['🌟', '🌙', '☄️', '🪐', '🚀', '✨', '🌍', '🛸', '👩‍🚀'],
      ageGroups: ['little', 'smart', 'super'],
    },
  ];
}
