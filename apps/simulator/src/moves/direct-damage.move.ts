import { Effect, DamageEffect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type, typeEffectiveness } from '../type';
import { Move } from './move';

export class DirectDamageMove extends Move {
  private _power: number;

  constructor(
    name: string,
    type: Type,
    power: number,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[]
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects);
    this._power = power;
  }

  use(user: Pokemon, target: Pokemon): boolean {
    if (!super.use(user, target)) {
      return false;
    }

    if (this._hasNoEffect(target)) {
      console.log(`It has no effect.`);
      return false;
    }

    new DamageEffect(undefined, this._power).apply(target);
    this._applyEffects(user, target);
    return true;
  }

  protected override _hasNoEffect(target: Pokemon): boolean {
    const primaryType = target.getPrimaryType();
    const secondaryType = target.getSecondaryType();

    const isPrimaryTypeIneffective = typeEffectiveness[this._type][primaryType] === 0;
    const isSecondaryTypeIneffective =
      secondaryType !== undefined && typeEffectiveness[this._type][secondaryType] === 0;

    return isPrimaryTypeIneffective || isSecondaryTypeIneffective;
  }

  copy(): DirectDamageMove {
    return new DirectDamageMove(
      this._name,
      this._type,
      this._power,
      this._maxPp,
      this._accuracy,
      this._userEffects,
      this._targetEffects
    );
  }
}
