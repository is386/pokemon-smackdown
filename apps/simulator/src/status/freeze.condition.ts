import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';
import { Condition } from './condition';

const movesThatThaw = ['burn up', 'flame wheel', 'flare blitz', 'scald'];

export class FreezeCondition extends Condition {
  apply(pokemon: Pokemon): void {
    if (
      randomIntFromInterval(0, 100) < 20 ||
      movesThatThaw.includes(pokemon.getSelectedMove()?.getName().toLowerCase() ?? '')
    ) {
      console.log(`${pokemon.getName()} thawed out!`);
      pokemon.setStatus(undefined);
    } else {
      console.log(`${pokemon.getName()} is frozen solid!`);
      pokemon.setSkipTurn(true);
    }
  }

  toString(): string {
    return 'frz';
  }
}
