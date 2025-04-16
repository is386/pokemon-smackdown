import { Pokemon } from '../pokemon';
import { StatModifierName } from '../pokemon/stat-modifiers';
import { Effect } from './effect';

export class StatModifierEffect extends Effect {
  private _stat: StatModifierName;
  private _stage: number;

  constructor(isAppliedToUser: boolean, stat: StatModifierName, stage: number) {
    super(isAppliedToUser);
    this._stat = stat;
    this._stage = stage;
  }

  apply(user: Pokemon, target: Pokemon): void {
    target.addStatStage(this._stat, this._stage);
  }
}
