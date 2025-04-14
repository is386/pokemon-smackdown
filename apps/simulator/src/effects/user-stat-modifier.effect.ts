import { Pokemon } from '../pokemon';
import { StatModifierName } from '../pokemon/stat-modifiers';
import { Effect } from './effect';

export class UserStatModifierEffect extends Effect {
  private _stat: StatModifierName;
  private _stage: number;

  constructor(stat: StatModifierName, stage: number) {
    super();
    this._stat = stat;
    this._stage = stage;
  }

  apply(user: Pokemon): void {
    user.addStatStage(this._stat, this._stage);
  }
}
