import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';
import { Condition } from './condition';

export class ParalysisCondition extends Condition {
  apply(pokemon: Pokemon): void {
    if (randomIntFromInterval(0, 100) < 25) {
      console.log(`${pokemon.name} is paralyzed!`);
      pokemon.skipTurn = true;
    }
  }

  toString(): string {
    return 'par';
  }
}
