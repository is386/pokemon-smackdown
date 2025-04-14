import { DirectDamageEffect } from '../effects/direct-damage.effect';
import { Pokemon } from '../pokemon';
import { Condition } from './condition';

export class BurnCondition extends Condition {
  apply(pokemon: Pokemon): void {
    pokemon.endEffects.push(new DirectDamageEffect(pokemon.getStat('hp') / 16));
  }

  toString(): string {
    return 'brn';
  }
}
