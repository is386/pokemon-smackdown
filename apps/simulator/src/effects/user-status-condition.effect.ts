import { Move } from '../moves';
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

  apply(move: Move, user: Pokemon): void {
    if (user.status) {
      return;
    }
    user.status = new Status(this._condition);
  }
}
