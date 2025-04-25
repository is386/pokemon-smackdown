import { Pokemon } from '../pokemon';
import { FlinchCondition } from '../volatile-status';
import { Effect } from './effect';

export class ApplyFlinchEffect extends Effect {
  apply(pokemon: Pokemon): void {
    // TODO: Check if the target has already attacked this turn
    pokemon.getVolatileStatus().addCondition(new FlinchCondition());
  }
}
