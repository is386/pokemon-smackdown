import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { Move } from './move';

export class StatusMove extends Move {
  constructor(
    name: string,
    type: Type,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[]
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects);
  }

  use(user: Pokemon, target: Pokemon): boolean {
    if (!super.use(user, target)) {
      return false;
    }

    this._applyEffects(user, target);
    return true;
  }

  copy(): StatusMove {
    return new StatusMove(
      this._name,
      this._type,
      this._maxPp,
      this._accuracy,
      this._userEffects,
      this._targetEffects
    );
  }
}
