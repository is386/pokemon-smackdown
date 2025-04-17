import { DamageEffect } from '../effects/damage.effect';
import { Pokemon } from '../pokemon';
import { Condition } from './condition';

export class BurnCondition extends Condition {
  apply(pokemon: Pokemon): void {
    pokemon
      .getEndOfTurnEffects()
      .push(
        new DamageEffect(
          undefined,
          Math.floor(pokemon.getStat('hp') / 16),
          `${pokemon.getName()} is hurt by its burn!`
        )
      );
  }

  toString(): string {
    return 'brn';
  }
}
