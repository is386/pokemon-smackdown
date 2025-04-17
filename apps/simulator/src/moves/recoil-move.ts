import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { DamageEffect } from '../effects/damage.effect';
import { DamageCategory, DamageMove } from './damage-move';

export class RecoilMove extends DamageMove {
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
    super(name, type, category, power, pp, accuracy, userEffects, targetEffects);
    this._recoilRatio = recoilRatio;
  }

  getRecoilRatio(): number {
    return this._recoilRatio;
  }

  use(user: Pokemon, target: Pokemon): boolean {
    if (!super.use(user, target)) {
      return false;
    }

    const damage = this._applyDamage(user, target);
    this._applyRecoil(user, damage);
    this._applyEffects(user, target);
    return true;
  }

  private _applyRecoil(user: Pokemon, damage: number): void {
    const recoilDamage = Math.floor(damage * this._recoilRatio);
    new DamageEffect(this, recoilDamage).apply(user);
    console.log(`${user.getName()} was damaged by the recoil!`);
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
