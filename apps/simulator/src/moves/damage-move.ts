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
    if (!super.use(user, target) || this._hasNoEffect(target)) {
      return false;
    }
    this._applyDamage(user, target);
    this._applyEffects(user, target);
    return true;
  }

  protected _applyDamage(user: Pokemon, target: Pokemon): number {
    const damage = calculateDamage(this, user, target);
    new DamageEffect(this, damage).apply(target);
    return damage;
  }

  protected _hasNoEffect(target: Pokemon): boolean {
    const primaryType = target.getPrimaryType();
    const secondaryType = target.getSecondaryType();

    const effectiveness = (type: Type) => typeEffectiveness[this._type][type] ?? 1;

    const primaryEffectiveness = effectiveness(primaryType);
    const secondaryEffectiveness = secondaryType ? effectiveness(secondaryType) : 1;

    if (primaryEffectiveness === 2 || secondaryEffectiveness === 2) {
      console.log(`It's super effective!`);
      return false;
    }

    if (primaryEffectiveness === 0.5 || secondaryEffectiveness === 0.5) {
      console.log(`It's not very effective...`);
      return false;
    }

    if (primaryEffectiveness === 0 || secondaryEffectiveness === 0) {
      console.log(`It has no effect.`);
      return true;
    }

    return false;
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
