import { SleepCondition } from '../status';
import { Status } from '../status';
import { Effect } from './effect';
import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';

export class SleepEffect extends Effect {
  private _turns: number;

  constructor(turns: number = randomIntFromInterval(1, 3)) {
    super();
    this._turns = turns;
  }

  apply(pokemon: Pokemon) {
    if (pokemon.getStatus()) {
      return;
    }
    console.log(`${pokemon.getName()} was put to sleep!`);
    pokemon.setStatus(new Status(new SleepCondition(this._turns)));
  }
}
