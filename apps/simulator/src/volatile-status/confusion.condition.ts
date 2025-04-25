import { DamageEffect } from '../effects';
import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';
import { Condition } from './condition';

export class ConfusionCondition extends Condition {
  private _turns: number = 0;

  constructor(turns: number) {
    super();
    this._turns = turns;
  }

  apply(pokemon: Pokemon): void {
    if (pokemon.isSkipTurn()) {
      return;
    }

    if (this._turns === 0) {
      console.log(`${pokemon.getName()} snapped out of confusion!`);
      this._isActive = false;
      return;
    }
    this._turns--;

    console.log(`${pokemon.getName()} is confused!`);

    if (randomIntFromInterval(1, 100) <= 100) {
      console.log('It hurt itself in its confusion!');
      new DamageEffect(undefined, 10).apply(pokemon);
      pokemon.setSkipTurn(true);
    }
  }
}
