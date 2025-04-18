import { Pokemon, StatModifierName } from '../pokemon';
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
    this._logMessage(pokemon);
    pokemon.addStatStage(this._stat, this._stage);
  }

  private _logMessage(pokemon: Pokemon): void {
    if (pokemon.getStatStage(this._stat) === 6) {
      console.log(`${pokemon.getName()}'s ${this._stat} won't go any higher!`);
    } else if (pokemon.getStatStage(this._stat) === -6) {
      console.log(`${pokemon.getName()}'s ${this._stat} won't go any lower!`);
    } else if (this._stage === 1) {
      console.log(`${pokemon.getName()}'s ${this._stat} rose!`);
    } else if (this._stage === -1) {
      console.log(`${pokemon.getName()}'s ${this._stat} fell!`);
    } else if (this._stage === 2) {
      console.log(`${pokemon.getName()}'s ${this._stat} rose sharply!`);
    } else if (this._stage === -2) {
      console.log(`${pokemon.getName()}'s ${this._stat} harshly fell!`);
    } else if (this._stage === 3) {
      console.log(`${pokemon.getName()}'s ${this._stat} rose drastically!`);
    } else if (this._stage === -3) {
      console.log(`${pokemon.getName()}'s ${this._stat} severely fell!`);
    }
  }
}
