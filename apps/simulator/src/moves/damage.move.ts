import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { calculateDamage } from '../utils/calculate-damage';
import { DamageEffect } from '../effects/damage.effect';
import { Move } from './move';

export type DamageCategory = 'physical' | 'special';

export class DamageMove extends Move {
  private _category: DamageCategory;
  private _power: number;

  constructor(
    name: string,
    type: Type,
    category: DamageCategory,
    power: number,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[]
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects);
    this._category = category;
    this._power = power;
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
    this._applyDamage(user, target);
    this._applyEffects(user, target);
    return true;
  }

  private _applyDamage(user: Pokemon, target: Pokemon): void {
    const damage = calculateDamage(this, user, target);
    new DamageEffect(this, damage).apply(target);
  }

  copy(): DamageMove {
    return new DamageMove(
      this._name,
      this._type,
      this._category,
      this._power,
      this._maxPp,
      this._accuracy,
      this._userEffects,
      this._targetEffects
    );
  }
}
