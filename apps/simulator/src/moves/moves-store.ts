import { Type } from '../type';
import { DamageMove } from './damage.move';
import { Move } from './move';
import { StatusMove } from './status.move';
import { RecoilMove } from './recoil.move';
import { MultiStrikeMove } from './multi-strike.move';
import {
  ApplyBurnEffect,
  ApplyFlinchEffect,
  ApplyFreezeEffect,
  ApplyParalysisEffect,
  ApplyPoisonEffect,
  RngEffect,
  ApplySleepEffect,
  StatModifierEffect,
  ApplyConfusionEffect,
} from '../effects';
import { DirectDamageMove } from './direct-damage.move';

const moves: Move[] = [
  new DamageMove('Tackle', Type.Normal, 'physical', 40, 35, 100, [], []),
  new StatusMove('Growl', Type.Normal, 40, 100, [], [new StatModifierEffect('attack', -1)]),
  new DamageMove('Vine Whip', Type.Grass, 'physical', 45, 25, 100, [], []),
  new StatusMove('Sweet Scent', Type.Normal, 20, 100, [], [new StatModifierEffect('evasion', -2)]),
  new StatusMove(
    'Growth',
    Type.Normal,
    20,
    100,
    [new StatModifierEffect('attack', 1), new StatModifierEffect('specialAttack', 1)],
    []
  ),
  new DamageMove('Seed Bomb', Type.Grass, 'physical', 80, 15, 100, [], []),
  new DamageMove('Scratch', Type.Normal, 'physical', 40, 35, 100, [], []),
  new StatusMove('Smokescreen', Type.Normal, 20, 100, [], [new StatModifierEffect('accuracy', -1)]),
  new StatusMove('Scary Face', Type.Normal, 10, 100, [], [new StatModifierEffect('speed', -2)]),
  new DamageMove('Wing Attack', Type.Flying, 'physical', 60, 35, 100, [], []),
  new DamageMove('Dragon Claw', Type.Dragon, 'physical', 80, 15, 100, [], []),
  new StatusMove('Tail Whip', Type.Normal, 30, 100, [], [new StatModifierEffect('defense', -1)]),
  new DamageMove('Water Gun', Type.Water, 'special', 40, 25, 100, [], []),
  new StatusMove('Withdraw', Type.Water, 40, 100, [new StatModifierEffect('defense', 1)], []),
  new DamageMove(
    'Bubble',
    Type.Water,
    'special',
    40,
    30,
    100,
    [],
    [new RngEffect(10, [new StatModifierEffect('speed', -1)])]
  ),
  new DamageMove('Aqua Tail', Type.Water, 'physical', 90, 10, 90, [], []),
  new StatusMove('Iron Defense', Type.Steel, 15, 100, [new StatModifierEffect('defense', 2)], []),
  new DamageMove('Hydro Pump', Type.Water, 'special', 110, 5, 80, [], []),
  new DamageMove(
    'Flash Cannon',
    Type.Steel,
    'special',
    80,
    10,
    100,
    [],
    [new RngEffect(10, [new StatModifierEffect('specialDefense', -1)])]
  ),
  new StatusMove('String Shot', Type.Bug, 40, 100, [], [new StatModifierEffect('speed', -2)]),
  new StatusMove('Harden', Type.Normal, 30, 100, [new StatModifierEffect('defense', 1)], []),
  new DamageMove(
    'Bite',
    Type.Dark,
    'physical',
    60,
    25,
    100,
    [],
    [new RngEffect(30, [new ApplyFlinchEffect()])]
  ),
  new DamageMove(
    'Air Slash',
    Type.Flying,
    'special',
    75,
    15,
    95,
    [],
    [new RngEffect(30, [new ApplyFlinchEffect()])]
  ),
  new StatusMove('Thunder Wave', Type.Electric, 20, 90, [], [new ApplyParalysisEffect()], true),
  new DamageMove(
    'Ember',
    Type.Fire,
    'special',
    40,
    25,
    100,
    [],
    [new RngEffect(10, [new ApplyBurnEffect()])]
  ),
  new DamageMove(
    'Ice Beam',
    Type.Ice,
    'special',
    90,
    10,
    100,
    [],
    [new RngEffect(10, [new ApplyFreezeEffect()])]
  ),
  new DamageMove(
    'Scald',
    Type.Water,
    'special',
    80,
    15,
    100,
    [],
    [new RngEffect(30, [new ApplyBurnEffect()])]
  ),
  new StatusMove('Hypnosis', Type.Psychic, 20, 70, [], [new ApplySleepEffect()]),
  new StatusMove('Poison Powder', Type.Poison, 20, 75, [], [new ApplyPoisonEffect()]),
  new RecoilMove('Take Down', Type.Normal, 'physical', 90, 0.25, 20, 85, [], []),
  new RecoilMove('Double-Edge', Type.Normal, 'physical', 120, 1 / 3, 15, 100, [], []),
  new MultiStrikeMove('Fury Attack', Type.Normal, 'physical', 15, 20, 85, [], []),
  new StatusMove('Sleep Powder', Type.Grass, 15, 75, [], [new ApplySleepEffect()]),
  new DirectDamageMove('Dragon Rage', Type.Dragon, 40, 10, 100, [], []),
  new DamageMove(
    'Fire Fang',
    Type.Fire,
    'physical',
    65,
    15,
    95,
    [],
    [new RngEffect(10, [new ApplyBurnEffect()]), new RngEffect(10, [new ApplyFlinchEffect()])]
  ),
  new DamageMove(
    'Flamethrower',
    Type.Fire,
    'special',
    90,
    15,
    100,
    [],
    [new RngEffect(10, [new ApplyBurnEffect()])]
  ),
  new DamageMove('Inferno', Type.Fire, 'special', 100, 5, 50, [], [new ApplyBurnEffect()]),
  new RecoilMove(
    'Flare Blitz',
    Type.Fire,
    'physical',
    120,
    1 / 3,
    5,
    100,
    [],
    [new RngEffect(10, [new ApplyBurnEffect()])]
  ),
  new DamageMove(
    'Heat Wave',
    Type.Fire,
    'special',
    95,
    10,
    90,
    [],
    [new RngEffect(10, [new ApplyBurnEffect()])]
  ),
  new MultiStrikeMove(
    'Twineedle',
    Type.Bug,
    'physical',
    25,
    20,
    100,
    [],
    [new RngEffect(36, [new ApplyPoisonEffect()])],
    2
  ),
  new DamageMove(
    'Silver Wind',
    Type.Bug,
    'special',
    60,
    5,
    100,
    [
      new RngEffect(10, [
        new StatModifierEffect('attack', 1),
        new StatModifierEffect('defense', 1),
        new StatModifierEffect('specialAttack', 1),
        new StatModifierEffect('specialDefense', 1),
        new StatModifierEffect('speed', 1),
      ]),
    ],
    []
  ),
  new DamageMove(
    'Confusion',
    Type.Psychic,
    'special',
    50,
    25,
    100,
    [],
    [new RngEffect(10, [new ApplyConfusionEffect()])]
  ),
  new DamageMove('Quick Attack', Type.Normal, 'physical', 40, 30, 100, [], [], 1),
  new DamageMove(
    'Psybeam',
    Type.Psychic,
    'special',
    65,
    20,
    100,
    [],
    [new RngEffect(10, [new ApplyConfusionEffect()])]
  ),
  new StatusMove('Stun Spore', Type.Grass, 30, 75, [], [new ApplyParalysisEffect()]),
  new DamageMove(
    'Water Pulse',
    Type.Water,
    'special',
    60,
    20,
    100,
    [],
    [new RngEffect(20, [new ApplyConfusionEffect()])]
  ),
  new StatusMove('Supersonic', Type.Normal, 20, 55, [], [new ApplyConfusionEffect()]),
  new DamageMove(
    'Bug Buzz',
    Type.Bug,
    'special',
    90,
    10,
    100,
    [],
    [new RngEffect(10, [new StatModifierEffect('specialDefense', -1)])]
  ),
  new StatusMove(
    'Quiver Dance',
    Type.Bug,
    20,
    -1,
    [
      new StatModifierEffect('specialAttack', 1),
      new StatModifierEffect('specialDefense', 1),
      new StatModifierEffect('speed', 1),
    ],
    []
  ),
  new DamageMove(
    'Poison Sting',
    Type.Poison,
    'physical',
    15,
    35,
    100,
    [],
    [new RngEffect(30, [new ApplyPoisonEffect()])]
  ),
  new MultiStrikeMove('Pin Missile', Type.Bug, 'physical', 25, 20, 95, [], []),
  new DamageMove(
    'Poison Jab',
    Type.Poison,
    'physical',
    80,
    20,
    100,
    [],
    [new RngEffect(30, [new ApplyPoisonEffect()])]
  ),
  new StatusMove('Agility', Type.Psychic, 30, -1, [new StatModifierEffect('speed', 2)], []),
  new StatusMove('Sand Attack', Type.Ground, 15, 100, [], [new StatModifierEffect('accuracy', -1)]),
  new StatusMove('Feather Dance', Type.Flying, 15, 100, [], [new StatModifierEffect('attack', -2)]),
  new DamageMove(
    'Hyper Fang',
    Type.Normal,
    'physical',
    80,
    15,
    90,
    [],
    [new RngEffect(10, [new ApplyFlinchEffect()])]
  ),
  new DamageMove(
    'Crunch',
    Type.Dark,
    'physical',
    80,
    15,
    100,
    [],
    [new RngEffect(20, [new StatModifierEffect('defense', -1)])]
  ),
  new StatusMove('Swords Dance', Type.Normal, 20, -1, [new StatModifierEffect('attack', 2)], []),
  new DamageMove('Peck', Type.Flying, 'physical', 35, 35, 100, [], []),
  new DamageMove('Drill Peck', Type.Flying, 'physical', 80, 20, 100, [], []),
  new DamageMove('Aerial Ace', Type.Flying, 'physical', 60, 20, -1, [], []),
  new StatusMove('Leer', Type.Normal, 30, 100, [], [new StatModifierEffect('defense', -1)]),
  new StatusMove('Glare', Type.Normal, 30, 100, [], [new ApplyParalysisEffect()]),
  new StatusMove('Screech', Type.Normal, 20, 100, [], [new StatModifierEffect('defense', -1)]),
  new DamageMove(
    'Acid',
    Type.Poison,
    'special',
    40,
    30,
    100,
    [],
    [new RngEffect(10, [new StatModifierEffect('specialDefense', -1)])]
  ),
  new DamageMove(
    'Acid Spray',
    Type.Poison,
    'special',
    40,
    20,
    100,
    [],
    [new StatModifierEffect('specialDefense', -2)]
  ),
  new DamageMove(
    'Mud Bomb',
    Type.Ground,
    'special',
    65,
    10,
    85,
    [],
    [new RngEffect(30, [new StatModifierEffect('accuracy', -1)])]
  ),
  new StatusMove(
    'Coil',
    Type.Poison,
    20,
    -1,
    [
      new StatModifierEffect('attack', 1),
      new StatModifierEffect('defense', 1),
      new StatModifierEffect('accuracy', 1),
    ],
    []
  ),
  new DamageMove(
    'Gunk Shot',
    Type.Poison,
    'physical',
    120,
    5,
    80,
    [],
    [new RngEffect(30, [new ApplyPoisonEffect()])]
  ),
  new DamageMove(
    'Ice Fang',
    Type.Ice,
    'physical',
    65,
    15,
    95,
    [],
    [new RngEffect(10, [new ApplyFreezeEffect()]), new RngEffect(10, [new ApplyFlinchEffect()])]
  ),
  new DamageMove(
    'Thunder Fang',
    Type.Electric,
    'physical',
    65,
    15,
    95,
    [],
    [new RngEffect(10, [new ApplyParalysisEffect()]), new RngEffect(10, [new ApplyFlinchEffect()])]
  ),
];

// TODO
// Leech Seed
// Razor Leaf
// Worry Seed
// Synthesis
// Solar Beam
// Petal Dance
// Petal Blizzard
// Slash
// Fire Spin
// Shadow Claw
// Rapid Spin
// Protect
// Rain Dance
// Bug Bite
// Gust
// Rage Powder
// Captivate
// Tailwind
// Rage
// Pursuit
// Focus Energy
// Venoshock
// Assurance
// Toxic Spikes
// Endeavor
// Fell Stinger
// Twister
// Roost
// Mirror Move
// Hurricane
// Sucker Punch
// Super Fang
// Drill Run
// Pluck
// Wrap
// Stockpile
// Swallow
// Spit Up
// Gastro Acid
// Belch
// Haze

export function getMove(name: string): Move {
  const move = moves.find((m) => m.getName().toLowerCase() === name.toLowerCase());
  if (!move) {
    throw Error(`move ${name} not found`);
  }
  return move.copy();
}
