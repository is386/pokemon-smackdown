import { DamageEffect } from '../effects/damage.effect';
import { FlinchEffect } from '../effects/flinch.effect';
import { RecoilEffect } from '../effects/recoil.effect';
import { RngEffect } from '../effects/rng.effect';
import { TargetStatModifierEffect } from '../effects/target-stat-modifier.effect';
import { TargetStatusConditionEffect } from '../effects/target-status-condition.effect';
import { UserStatModifierEffect } from '../effects/user-stat-modifier.effect';
import { BurnCondition } from '../status/burn.condition';
import { ParalysisCondition } from '../status/paralysis.condition';
import { Type } from '../type';
import { Move } from './move';

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

const movesMap = new Map<string, Move>([
  [
    'tackle',
    new Move('Tackle', Type.Normal, 'physical', 35, 100, [
      new DamageEffect(40, Type.Normal, 'physical'),
    ]),
  ],
  [
    'growl',
    new Move('Growl', Type.Normal, 'status', 40, 100, [
      new TargetStatModifierEffect('attack', -1),
    ]),
  ],
  [
    'vine whip',
    new Move('Vine Whip', Type.Grass, 'physical', 25, 100, [
      new DamageEffect(45, Type.Grass, 'physical'),
    ]),
  ],
  [
    'take down',
    new Move('Take Down', Type.Normal, 'physical', 20, 85, [
      new RecoilEffect(90, Type.Normal, 'physical', 0.25),
    ]),
  ],
  [
    'sweet scent',
    new Move('Sweet Scent', Type.Normal, 'status', 20, 100, [
      new TargetStatModifierEffect('evasion', -2),
    ]),
  ],
  [
    'growth',
    new Move('Growth', Type.Normal, 'status', 20, -1, [
      new UserStatModifierEffect('attack', 1),
      new UserStatModifierEffect('specialAttack', 1),
    ]),
  ],
  [
    'double-edge',
    new Move('Double-Edge', Type.Normal, 'physical', 15, 100, [
      new RecoilEffect(120, Type.Normal, 'physical', 1 / 3),
    ]),
  ],
  [
    'seed bomb',
    new Move('Seed Bomb', Type.Grass, 'physical', 15, 100, [
      new DamageEffect(80, Type.Grass, 'physical'),
    ]),
  ],
  [
    'scratch',
    new Move('Scratch', Type.Normal, 'physical', 35, 100, [
      new DamageEffect(40, Type.Normal, 'physical'),
    ]),
  ],
  [
    'smokescreen',
    new Move('Smokescreen', Type.Normal, 'status', 20, 100, [
      new TargetStatModifierEffect('accuracy', -1),
    ]),
  ],
  [
    'scary face',
    new Move('Scary Face', Type.Normal, 'status', 10, 100, [
      new TargetStatModifierEffect('speed', -2),
    ]),
  ],
  [
    'wing attack',
    new Move('Wing Attack', Type.Flying, 'physical', 35, 100, [
      new DamageEffect(60, Type.Flying, 'physical'),
    ]),
  ],
  [
    'dragon claw',
    new Move('Dragon Claw', Type.Dragon, 'physical', 15, 100, [
      new DamageEffect(80, Type.Dragon, 'physical'),
    ]),
  ],
  [
    'tail whip',
    new Move('Tail Whip', Type.Normal, 'status', 30, 100, [
      new TargetStatModifierEffect('defense', -1),
    ]),
  ],
  [
    'water gun',
    new Move('Water Gun', Type.Water, 'special', 25, 100, [
      new DamageEffect(40, Type.Water, 'special'),
    ]),
  ],
  [
    'withdraw',
    new Move('Withdraw', Type.Water, 'status', 40, -1, [
      new UserStatModifierEffect('defense', 1),
    ]),
  ],
  [
    'bubble',
    new Move('Bubble', Type.Water, 'special', 30, 100, [
      new DamageEffect(40, Type.Water, 'special'),
      new RngEffect(10, [new TargetStatModifierEffect('speed', -1)]),
    ]),
  ],
  [
    'aqua tail',
    new Move('Aqua Tail', Type.Water, 'physical', 10, 90, [
      new DamageEffect(90, Type.Water, 'physical'),
    ]),
  ],
  [
    'iron defense',
    new Move('Iron Defense', Type.Steel, 'status', 20, -1, [
      new UserStatModifierEffect('defense', 2),
    ]),
  ],
  [
    'hydro pump',
    new Move('Hydro Pump', Type.Water, 'special', 5, 80, [
      new DamageEffect(110, Type.Water, 'special'),
    ]),
  ],
  [
    'flash cannon',
    new Move('Flash Cannon', Type.Steel, 'special', 10, 100, [
      new DamageEffect(80, Type.Steel, 'special'),
      new RngEffect(10, [new TargetStatModifierEffect('specialDefense', -1)]),
    ]),
  ],
  [
    'string shot',
    new Move('String Shot', Type.Bug, 'status', 40, 100, [
      new TargetStatModifierEffect('speed', -2),
    ]),
  ],
  [
    'harden',
    new Move('Harden', Type.Normal, 'status', 30, -1, [
      new UserStatModifierEffect('defense', 1),
    ]),
  ],
  [
    'fury attack',
    new Move('Fury Attack', Type.Normal, 'physical', 20, 85, [
      new DamageEffect(15, Type.Normal, 'physical'),
      new DamageEffect(15, Type.Normal, 'physical'),
      new RngEffect(62.5, [
        new DamageEffect(15, Type.Normal, 'physical'),
        new RngEffect(25, [
          new DamageEffect(15, Type.Normal, 'physical'),
          new RngEffect(12.5, [new DamageEffect(15, Type.Normal, 'physical')]),
        ]),
      ]),
    ]),
  ],
  [
    'bite',
    new Move('Bite', Type.Dark, 'physical', 25, 100, [
      new DamageEffect(60, Type.Dark, 'physical'),
      new RngEffect(30, [new FlinchEffect()]),
    ]),
  ],
  [
    'air slash',
    new Move('Air Slash', Type.Flying, 'special', 15, 95, [
      new DamageEffect(75, Type.Flying, 'special'),
      new RngEffect(30, [new FlinchEffect()]),
    ]),
  ],
  [
    'thunder wave',
    new Move('Thunder Wave', Type.Electric, 'status', 20, 90, [
      new TargetStatusConditionEffect(new ParalysisCondition()),
    ]),
  ],
  [
    'ember',
    new Move('Ember', Type.Fire, 'special', 25, 100, [
      new DamageEffect(40, Type.Fire, 'special'),
      new RngEffect(100, [
        new TargetStatusConditionEffect(new BurnCondition()),
      ]),
    ]),
  ],
]);

export function getMove(name: string): Move {
  const move = movesMap.get(name.toLowerCase());
  if (!move) {
    throw Error(`move ${name} not found`);
  }
  return new Move(move.name, move.type, move.category, move.pp, move.accuracy, [
    ...move.effects,
  ]);
}
