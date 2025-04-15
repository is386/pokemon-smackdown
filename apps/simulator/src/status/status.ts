import { BurnCondition } from './burn.condition';
import { Condition } from './condition';
import { FreezeCondition } from './freeze.condition';
import { ParalysisCondition } from './paralysis.condition';

export class Status {
  private _condition: Condition;

  constructor(condition: Condition) {
    this._condition = condition;
  }

  getCondition(): Condition {
    return this._condition;
  }

  isParalyzed(): boolean {
    return this._condition instanceof ParalysisCondition;
  }

  isBurned(): boolean {
    return this._condition instanceof BurnCondition;
  }

  isFrozen(): boolean {
    return this._condition instanceof FreezeCondition;
  }

  toString(): string {
    return this._condition.toString();
  }
}
