import { Pokemon } from '../pokemon';
import { StatModifierName } from '../pokemon/stat-modifiers';
import { Effect } from './effect';

export class StatModifierEffect extends Effect {
  private _stat: StatModifierName;
  private _stage: number;

  constructor(stat: StatModifierName, stage: number) {
    super();
    this._stat = stat;
    this._stage = stage;
  }

  apply(pokemon: Pokemon): void {
    pokemon.addStatStage(this._stat, this._stage);
  }
}
