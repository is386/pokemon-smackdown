import { BurnCondition } from './burn.condition';
import { Condition } from './condition';
import { ParalysisCondition } from './paralysis.condition';

export class Status {
  private _condition: Condition;

  constructor(condition: Condition) {
    this._condition = condition;
  }

  get condition(): Condition {
    return this._condition;
  }

  get isParalyzed(): boolean {
    return this._condition instanceof ParalysisCondition;
  }

  get isBurned(): boolean {
    return this._condition instanceof BurnCondition;
  }

  toString(): string {
    return this._condition.toString();
  }
}
