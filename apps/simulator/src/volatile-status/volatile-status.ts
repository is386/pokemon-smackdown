import { Pokemon } from '../pokemon';
import { Condition } from './condition';
import { ConfusionCondition } from './confusion.condition';

export class VolatileStatus {
  private _conditions: Condition[] = [];

  addCondition(condition: Condition): void {
    this._conditions.push(condition);
  }

  apply(pokemon: Pokemon): void {
    this._conditions = this._conditions.sort((a, b) => b.getPriority() - a.getPriority());
    this._conditions = this._conditions.filter((condition) => {
      condition.apply(pokemon);
      return condition.isActive();
    });
  }

  isConfused(): boolean {
    return this._conditions.some((condition) => condition instanceof ConfusionCondition);
  }
}
