import { Pokemon } from '../pokemon';

export abstract class Condition {
  protected _isActive: boolean = true;
  protected _priority: number = 0;

  isActive(): boolean {
    return this._isActive;
  }

  getPriority(): number {
    return this._priority;
  }

  abstract apply(pokemon: Pokemon): void;
}
