import { Pokemon } from '../pokemon';
import { FreezeCondition } from '../status';
import { Status } from '../status';
import { Type } from '../type';
import { Effect } from './effect';

export class ApplyFreezeEffect extends Effect {
  apply(pokemon: Pokemon) {
    if (
      pokemon.getStatus() ||
      pokemon.getPrimaryType() === Type.Ice ||
      pokemon.getSecondaryType() === Type.Ice
    ) {
      return;
    }
    console.log(`${pokemon.getName()} was frozen!`);
    pokemon.setStatus(new Status(new FreezeCondition()));
  }
}
