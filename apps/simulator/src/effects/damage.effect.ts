import { Move } from '../moves';
import { Pokemon } from '../pokemon';
import { calculateDamage } from './calculate-damage';
import { Effect } from './effect';

export class DamageEffect extends Effect {
  private _power: number;

  constructor(power: number) {
    super();
    this._power = power;
  }

  apply(move: Move, user: Pokemon, target: Pokemon): void {
    target.takeDamage(calculateDamage(move, user, target, this._power));
  }
}
