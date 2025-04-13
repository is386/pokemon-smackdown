import { DamageEffect } from '../effects/damage.effect';
import { TargetStatModifierEffect } from '../effects/target-stat-modifier.effect copy';
import { Type } from '../type';
import { Move } from './move';

const movesMap = new Map<string, Move>([
  [
    'tackle',
    new Move('Tackle', Type.Normal, 'physical', 35, 100, [
      new DamageEffect(40),
    ]),
  ],
  [
    'growl',
    new Move('Growl', Type.Normal, 'status', 40, 100, [
      new TargetStatModifierEffect('attack', -1),
    ]),
  ],
]);

export function getMove(name: string): Move {
  const move = movesMap.get(name);
  if (!move) {
    throw Error(`move ${name} not found`);
  }
  return new Move(move.name, move.type, move.category, move.pp, move.accuracy, [
    ...move.effects,
  ]);
}
