import { Pokemon } from '../pokemon';
import { Effect } from './effect';
import { SkipTurnEffect } from './skip-turn.effect';

export class FlinchEffect extends Effect {
  apply(pokemon: Pokemon): void {
    pokemon.getAfterStatusCheckEffects().push(new SkipTurnEffect(`${pokemon.getName()} flinched!`));
  }
}
