import { Pokemon } from '../pokemon';
import { Condition } from './condition';

export class SleepCondition extends Condition {
  private _turns: number;

  constructor(turns: number) {
    super();
    this._turns = turns;
  }

  apply(pokemon: Pokemon): void {
    if (this._turns === 0) {
      console.log(`${pokemon.getName()} woke up!`);
      pokemon.setStatus(undefined);
    } else {
      console.log(`${pokemon.getName()} is fast asleep.`);
      pokemon.setSkipTurn(true);
      this._turns--;
    }
  }

  toString(): string {
    return 'slp';
  }
}
