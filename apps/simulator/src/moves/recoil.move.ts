import { Effect } from '../effects';
import { DamageEffect } from '../effects/damage.effect';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { calculateDamage } from '../utils/calculate-damage';
import { DamageCategory } from './damage.move';
import { Move } from './move';

export class RecoilMove extends Move {
  private _category: DamageCategory;
  private _power: number;
  private _recoilRatio: number;

  constructor(
    name: string,
    type: Type,
    category: DamageCategory,
    power: number,
    recoilRatio: number,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[]
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects);
    this._category = category;
    this._power = power;
    this._recoilRatio = recoilRatio;
  }

  getCategory(): DamageCategory {
    return this._category;
  }

  getPower(): number {
    return this._power;
  }

  use(user: Pokemon, target: Pokemon): boolean {
    if (!super.use(user, target) || this._hasNoEffect(target)) {
      return false;
    }

    this._applyDamageAndRecoil(user, target);
    this._applyEffects(user, target);
    return true;
  }

  private _applyDamageAndRecoil(user: Pokemon, target: Pokemon): void {
    const damage = calculateDamage(this, user, target);
    new DamageEffect(this, damage).apply(target);
    const recoilDamage = Math.floor(damage * this._recoilRatio);
    new DamageEffect(undefined, recoilDamage, `${user.getName()} was damaged by the recoil!`).apply(
      user
    );
  }

  copy(): RecoilMove {
    return new RecoilMove(
      this._name,
      this._type,
      this._category,
      this._power,
      this._recoilRatio,
      this._maxPp,
      this._accuracy,
      this._userEffects,
      this._targetEffects
    );
  }
}
