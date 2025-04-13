import { Move, MoveCategory } from '../moves';
import { Pokemon } from '../pokemon';
import { Effect } from './effect';
import { randomIntFromInterval } from '../utils';

export const typeEffectiveness: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
  [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
];

function getCritMultiplier(stage: number): number {
  let chance: number;

  if (stage >= 3) {
    chance = 1.0;
  } else if (stage === 2) {
    chance = 0.5;
  } else if (stage === 1) {
    chance = 0.125;
  } else {
    chance = 0.0625;
  }

  const roll = Math.random();
  return roll < chance ? 1.5 : 1.0;
}

// https://bulbapedia.bulbagarden.net/wiki/Damage
export class DamageEffect extends Effect {
  private _power: number;

  constructor(power: number) {
    super();
    this._power = power;
  }

  apply(move: Move, user: Pokemon, target: Pokemon): void {
    if (move.category === MoveCategory.Status) {
      throw Error('Move category is not Physical or Special');
    }
    const level = user.level;

    const a =
      move.category === MoveCategory.Physical
        ? user.getBaseStatWithModifier('attack')
        : user.getBaseStatWithModifier('specialAttack');

    const d =
      move.category === MoveCategory.Physical
        ? target.getBaseStatWithModifier('defense')
        : target.getBaseStatWithModifier('specialDefense');

    const power = this._power;
    const critical = getCritMultiplier(0);
    const random = randomIntFromInterval(85, 100) / 100;
    const stab =
      move.type === user.primaryType || move.type === user.secondaryType
        ? 1.5
        : 1;

    let type = typeEffectiveness[move.type][target.primaryType];
    type *= target.secondaryType
      ? typeEffectiveness[move.type][target.secondaryType]
      : 1;

    const damage =
      ((((2 * level) / 5 + 2) * power * (a / d)) / 50 + 2) *
      critical *
      random *
      stab *
      type;
    console.log(damage);
    target.takeDamage(Math.round(damage));
  }
}
