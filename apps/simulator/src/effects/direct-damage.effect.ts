import { Pokemon } from '../pokemon';
import { Effect } from './effect';

export class DirectDamageEffect extends Effect {
  private _damage: number;

  constructor(damage: number) {
    super();
    this._damage = damage;
  }

  apply(user: Pokemon, target: Pokemon): void {
    target.takeDamage(Math.floor(this._damage));
  }
}
