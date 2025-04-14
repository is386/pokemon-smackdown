import { MoveCategory } from '../moves';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { calculateDamage } from './calculate-damage';
import { Effect } from './effect';

export class RecoilEffect extends Effect {
  private _power: number;
  private _type: Type;
  private _category: MoveCategory;
  private _recoilRatio: number;

  constructor(
    power: number,
    type: Type,
    category: MoveCategory,
    recoilRatio: number
  ) {
    super();
    this._power = power;
    this._type = type;
    this._category = category;
    this._recoilRatio = recoilRatio;
  }

  apply(user: Pokemon, target: Pokemon): void {
    const damage = calculateDamage(
      user,
      target,
      this._power,
      this._type,
      this._category
    );
    const recoil = Math.floor(damage * this._recoilRatio);
    console.log(`${user.name} was damaged by the recoil!`);
    target.takeDamage(damage);
    user.takeDamage(recoil);
  }
}
