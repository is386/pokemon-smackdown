import { DamageEffect } from '../effects/damage.effect';
import { TargetStatModifierEffect } from '../effects/target-stat-modifier.effect copy';
import { Type } from '../type';
import { Move } from './move';
import { MoveCategory } from './move';

const movesMap = new Map<string, Move>([
  [
    'Tackle',
    new Move('Tackle', Type.Normal, MoveCategory.Physical, 35, 100, [
      new DamageEffect(40),
    ]),
  ],
  [
    'Growl',
    new Move('Growl', Type.Normal, MoveCategory.Status, 40, 100, [
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
