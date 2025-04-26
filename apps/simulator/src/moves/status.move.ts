import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type, typeEffectiveness } from '../type';
import { Move } from './move';

export class StatusMove extends Move {
  private _applyTypeEffectiveness: boolean;

  constructor(
    name: string,
    type: Type,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[],
    applyTypeEffectiveness: boolean = false,
    priority: number = 0
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects, priority);
    this._applyTypeEffectiveness = applyTypeEffectiveness;
  }

  use(user: Pokemon, target: Pokemon): boolean {
    if (!super.use(user, target)) {
      return false;
    }

    if (this._hasNoEffect(target)) {
      console.log(`It has no effect.`);
      return false;
    }

    this._applyEffects(user, target);
    return true;
  }

  protected override _hasNoEffect(target: Pokemon): boolean {
    if (!this._applyTypeEffectiveness) {
      return false;
    }

    const primaryType = target.getPrimaryType();
    const secondaryType = target.getSecondaryType();

    const isPrimaryTypeIneffective = typeEffectiveness[this._type][primaryType] === 0;
    const isSecondaryTypeIneffective =
      secondaryType !== undefined && typeEffectiveness[this._type][secondaryType] === 0;

    return isPrimaryTypeIneffective || isSecondaryTypeIneffective;
  }

  copy(): StatusMove {
    return new StatusMove(
      this._name,
      this._type,
      this._maxPp,
      this._accuracy,
      this._userEffects,
      this._targetEffects,
      this._applyTypeEffectiveness,
      this._priority
    );
  }
}
