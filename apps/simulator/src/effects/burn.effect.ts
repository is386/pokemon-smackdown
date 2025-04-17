import { Pokemon } from '../pokemon';
import { BurnCondition } from '../status';
import { Status } from '../status';
import { Type } from '../type';
import { Effect } from './effect';

export class BurnEffect extends Effect {
  apply(pokemon: Pokemon) {
    if (
      pokemon.getStatus() ||
      pokemon.getPrimaryType() === Type.Fire ||
      pokemon.getSecondaryType() === Type.Fire
    ) {
      return;
    }
    console.log(`${pokemon.getName()} was burned!`);
    pokemon.setStatus(new Status(new BurnCondition()));
  }
}
