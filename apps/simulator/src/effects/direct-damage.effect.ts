import { Pokemon } from '../pokemon';
import { Effect } from './effect';

export class DirectDamageEffect extends Effect {
  private _damage: number;

  constructor(isAppliedToUser: boolean, damage: number) {
    super(isAppliedToUser);
    this._damage = damage;
  }

  apply(user: Pokemon, target: Pokemon): void {
    target.takeDamage(Math.floor(this._damage));
  }
}
