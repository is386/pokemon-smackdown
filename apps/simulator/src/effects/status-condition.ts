import { Pokemon } from '../pokemon';
import { Condition } from '../status/condition';
import { Status } from '../status/status';
import { Effect } from './effect';

export class StatusConditionEffect extends Effect {
  private _condition: Condition;

  constructor(isAppliedToUser: boolean, condition: Condition) {
    super(isAppliedToUser);
    this._condition = condition;
  }

  apply(user: Pokemon, target: Pokemon): void {
    if (target.getStatus()) {
      return;
    }
    target.setStatus(new Status(this._condition));
  }
}
