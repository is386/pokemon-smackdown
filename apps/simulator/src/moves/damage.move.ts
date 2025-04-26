import { DamageEffect, Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { calculateDamage } from '../utils';
import { AttackCategory, Move } from './move';

export class DamageMove extends Move {
  private _category: AttackCategory;
  private _power: number;

  constructor(
    name: string,
    type: Type,
    category: AttackCategory,
    power: number,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[],
    priority: number = 0
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects, priority);
    this._category = category;
    this._power = power;
  }

  getCategory(): AttackCategory {
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
      this._targetEffects,
      this._priority
    );
  }
}
