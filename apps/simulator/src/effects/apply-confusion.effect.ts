import { Effect } from './effect';
import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';
import { ConfusionCondition } from '../volatile-status';

export class ApplyConfusionEffect extends Effect {
  private _turns: number;

  constructor(turns: number = randomIntFromInterval(2, 5)) {
    super();
    this._turns = turns;
  }

  apply(pokemon: Pokemon) {
    if (pokemon.getVolatileStatus().isConfused()) {
      console.log(`${pokemon.getName()} is already confused!`);
      return;
    }
    console.log(`${pokemon.getName()} was confused!`);
    pokemon.getVolatileStatus().addCondition(new ConfusionCondition(this._turns));
  }
}
