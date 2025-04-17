export type Nature =
  | 'hardy'
  | 'lonely'
  | 'brave'
  | 'adamant'
  | 'naughty'
  | 'bold'
  | 'docile'
  | 'relaxed'
  | 'impish'
  | 'lax'
  | 'timid'
  | 'hasty'
  | 'serious'
  | 'jolly'
  | 'naive'
  | 'modest'
  | 'mild'
  | 'quiet'
  | 'bashful'
  | 'rash'
  | 'calm'
  | 'gentle'
  | 'sassy'
  | 'careful'
  | 'quirky';

export interface NatureStats {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export const natureMap = new Map<Nature, NatureStats>([
  ['hardy', { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 }],
  [
    'lonely',
    {
      attack: 1.1,
      defense: 0.9,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1,
    },
  ],
  [
    'brave',
    {
      attack: 1.1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 0.9,
    },
  ],
  [
    'adamant',
    {
      attack: 1.1,
      defense: 1,
      specialAttack: 0.9,
      specialDefense: 1,
      speed: 1,
    },
  ],
  [
    'naughty',
    {
      attack: 1.1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 0.9,
      speed: 1,
    },
  ],
  [
    'bold',
    {
      attack: 0.9,
      defense: 1.1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1,
    },
  ],
  ['docile', { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 }],
  [
    'relaxed',
    {
      attack: 1,
      defense: 1.1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 0.9,
    },
  ],
  [
    'impish',
    {
      attack: 1,
      defense: 1.1,
      specialAttack: 0.9,
      specialDefense: 1,
      speed: 1,
    },
  ],
  [
    'lax',
    {
      attack: 1,
      defense: 1.1,
      specialAttack: 1,
      specialDefense: 0.9,
      speed: 1,
    },
  ],
  [
    'timid',
    {
      attack: 0.9,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1.1,
    },
  ],
  [
    'hasty',
    {
      attack: 1,
      defense: 0.9,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1.1,
    },
  ],
  ['serious', { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 }],
  [
    'jolly',
    {
      attack: 1,
      defense: 1,
      specialAttack: 0.9,
      specialDefense: 1,
      speed: 1.1,
    },
  ],
  [
    'naive',
    {
      attack: 1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 0.9,
      speed: 1.1,
    },
  ],
  [
    'modest',
    {
      attack: 0.9,
      defense: 1,
      specialAttack: 1.1,
      specialDefense: 1,
      speed: 1,
    },
  ],
  [
    'mild',
    {
      attack: 1,
      defense: 0.9,
      specialAttack: 1.1,
      specialDefense: 1,
      speed: 1,
    },
  ],
  [
    'quiet',
    {
      attack: 1,
      defense: 1,
      specialAttack: 1.1,
      specialDefense: 1,
      speed: 0.9,
    },
  ],
  ['bashful', { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 }],
  [
    'rash',
    {
      attack: 1,
      defense: 1,
      specialAttack: 1.1,
      specialDefense: 0.9,
      speed: 1,
    },
  ],
  [
    'calm',
    {
      attack: 0.9,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1.1,
      speed: 1,
    },
  ],
  [
    'gentle',
    {
      attack: 1,
      defense: 0.9,
      specialAttack: 1,
      specialDefense: 1.1,
      speed: 1,
    },
  ],
  [
    'sassy',
    {
      attack: 1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1.1,
      speed: 0.9,
    },
  ],
  [
    'careful',
    {
      attack: 1,
      defense: 1,
      specialAttack: 0.9,
      specialDefense: 1.1,
      speed: 1,
    },
  ],
  ['quirky', { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 }],
]);
