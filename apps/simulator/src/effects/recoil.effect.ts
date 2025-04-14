import { Move } from '../moves';
import { Pokemon } from '../pokemon';
import { calculateDamage } from './calculate-damage';
import { Effect } from './effect';

export class RecoilEffect extends Effect {
  private _power: number;
  private _recoilRatio: number;

  constructor(power: number, recoilRatio: number) {
    super();
    this._power = power;
    this._recoilRatio = recoilRatio;
  }

  apply(move: Move, user: Pokemon, target: Pokemon): void {
    const damage = calculateDamage(move, user, target, this._power);
    const recoil = Math.floor(damage * this._recoilRatio);
    console.log(`${user.name} was damaged by the recoil!`);
    target.takeDamage(damage);
    user.takeDamage(recoil);
  }
}
