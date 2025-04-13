import { Move } from '../moves';
import { Pokemon } from '../pokemon';
import { StatName } from '../pokemon/stat-modifiers';
import { Effect } from './effect';

export class UserStatModifierEffect extends Effect {
  private _stat: StatName;
  private _stage: number;

  constructor(stat: StatName, stage: number) {
    super();
    this._stat = stat;
    this._stage = stage;
  }

  apply(move: Move, user: Pokemon): void {
    user.addStatStage(this._stat, this._stage);
  }
}
