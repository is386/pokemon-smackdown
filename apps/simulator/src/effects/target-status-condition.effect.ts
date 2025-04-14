import { Pokemon } from '../pokemon';
import { Condition } from '../status/condition';
import { Status } from '../status/status';
import { Effect } from './effect';

export class TargetStatusConditionEffect extends Effect {
  private _condition: Condition;

  constructor(condition: Condition) {
    super();
    this._condition = condition;
  }

  apply(user: Pokemon, target: Pokemon): void {
    if (target.status) {
      return;
    }
    target.status = new Status(this._condition);
  }
}
