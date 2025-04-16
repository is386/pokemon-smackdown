import { Pokemon } from '../pokemon';

export abstract class Effect {
  private _isAppliedToUser: boolean;

  constructor(isAppliedToUser: boolean) {
    this._isAppliedToUser = isAppliedToUser;
  }

  get isAppliedToUser(): boolean {
    return this._isAppliedToUser;
  }

  abstract apply(user: Pokemon, target: Pokemon): void;
}
