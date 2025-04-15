import { Pokemon } from '../pokemon';
import { Condition } from '../status/condition';
import { Status } from '../status/status';
import { Effect } from './effect';

export class UserStatusConditionEffect extends Effect {
  private _condition: Condition;

  constructor(condition: Condition) {
    super();
    this._condition = condition;
  }

  apply(user: Pokemon): void {
    if (user.getStatus()) {
      return;
    }
    user.setStatus(new Status(this._condition));
  }
}
