import { BurnEffect } from '../effects/burn.effect';
import { FlinchEffect } from '../effects/flinch.effect';
import { FreezeEffect } from '../effects/freeze.effect';
import { ParalysisEffect } from '../effects/paralysis.effect';
import { RngEffect } from '../effects/rng.effect';
import { StatModifierEffect } from '../effects/stat-modifier.effect';
import { Type } from '../type';
import { DamageMove } from './damage-move';
import { Move } from './move';
import { RecoilMove } from './recoil-move';
import { StatusMove } from './status-move';

// TODO
// Leech Seed
// Poison Powder
// Sleep Powder
// Razor Leaf
// Worry Seed
// Synthesis
// Solar Beam
// Petal Dance
// Petal Blizzard
// Dragon Rage
// Fire Fang
// Slash
// Flamethrower
// Fire Spin
// Inferno
// Flare Blitz
// Heat Wave
// Shadow Claw
// Rapid Spin
// Protect
// Water Pulse
// Rain Dance
// Bug Bite
// Twin Needle
// Fury Attack

const moves: Move[] = [
  new DamageMove('Tackle', Type.Normal, 'physical', 40, 35, 100, [], []),
  new StatusMove('Growl', Type.Normal, 40, 100, [], [new StatModifierEffect('attack', -1)]),
  new DamageMove('Vine Whip', Type.Grass, 'physical', 45, 25, 100, [], []),
  new RecoilMove('Take Down', Type.Normal, 'physical', 90, 0.25, 20, 85, [], []),
  new StatusMove('Sweet Scent', Type.Normal, 20, 100, [], [new StatModifierEffect('evasion', -2)]),
  new StatusMove(
    'Growth',
    Type.Normal,
    20,
    100,
    [new StatModifierEffect('attack', 1), new StatModifierEffect('specialAttack', 1)],
    []
  ),
  new RecoilMove('Double-Edge', Type.Normal, 'physical', 120, 1 / 3, 15, 100, [], []),
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
    [new RngEffect(100, [new FlinchEffect()])]
  ),
  new DamageMove(
    'Air Slash',
    Type.Flying,
    'special',
    75,
    15,
    95,
    [],
    [new RngEffect(30, [new FlinchEffect()])]
  ),
  new StatusMove('Thunder Wave', Type.Electric, 20, 90, [], [new ParalysisEffect()]),
  new DamageMove(
    'Ember',
    Type.Fire,
    'special',
    40,
    25,
    100,
    [],
    [new RngEffect(10, [new BurnEffect()])]
  ),
  new DamageMove(
    'Ice Beam',
    Type.Ice,
    'special',
    90,
    10,
    100,
    [],
    [new RngEffect(100, [new FreezeEffect()])]
  ),
  new DamageMove(
    'Scald',
    Type.Water,
    'special',
    80,
    15,
    100,
    [],
    [new RngEffect(30, [new BurnEffect()])]
  ),
];

export function getMove(name: string): Move {
  const move = moves.find((m) => m.getName().toLowerCase() === name.toLowerCase());
  if (!move) {
    throw Error(`move ${name} not found`);
  }
  return move.copy();
}
