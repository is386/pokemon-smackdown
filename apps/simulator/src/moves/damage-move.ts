import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type, typeEffectiveness } from '../type';
import { calculateDamage } from '../utils/calculate-damage';
import { DamageEffect } from '../effects/damage.effect';
import { Move } from './move';

export type DamageCategory = 'physical' | 'special';

export class DamageMove extends Move {
  protected _category: DamageCategory;
  protected _power: number;

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
    if (!super.use(user, target)) {
      return false;
    }

    this._applyDamage(user, target);
    this._logEffectiveness(target);
    this._applyEffects(user, target);
    return true;
  }

  protected _applyDamage(user: Pokemon, target: Pokemon): number {
    const damage = calculateDamage(this, user, target);
    new DamageEffect(this, damage).apply(target);
    return damage;
  }

  protected _logEffectiveness(target: Pokemon): void {
    const primaryType = target.getPrimaryType();
    const secondaryType = target.getSecondaryType();
    if (
      typeEffectiveness[this._type][primaryType] === 2 ||
      (secondaryType && typeEffectiveness[this._type][secondaryType] === 2)
    ) {
      console.log(`It's super effective!`);
    } else if (
      typeEffectiveness[this._type][primaryType] === 0.5 ||
      (secondaryType && typeEffectiveness[this._type][secondaryType] === 0.5)
    ) {
      console.log(`It's not very effective...`);
    } else if (
      typeEffectiveness[this._type][primaryType] === 0 ||
      (secondaryType && typeEffectiveness[this._type][secondaryType] === 0)
    ) {
      console.log(`It has no effect.`);
    }
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
