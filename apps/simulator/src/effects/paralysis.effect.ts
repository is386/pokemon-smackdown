import { Pokemon } from '../pokemon';
import { ParalysisCondition } from '../status';
import { Status } from '../status';
import { Type } from '../type';

export class ParalysisEffect {
  apply(pokemon: Pokemon) {
    if (
      pokemon.getStatus() ||
      pokemon.getPrimaryType() === Type.Electric ||
      pokemon.getSecondaryType() === Type.Electric
    ) {
      return;
    }
    console.log(`${pokemon.getName()} was paralyzed!`);
    pokemon.setStatus(new Status(new ParalysisCondition()));
  }
}
