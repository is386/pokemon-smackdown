import { DamageEffect } from '../effects/damage.effect';
import { Pokemon } from '../pokemon';
import { Condition } from './condition';

export class PoisonCondition extends Condition {
  private _badly: boolean;
  private _badlyDamageRatio = 1 / 16;

  constructor(badly: boolean = false) {
    super();
    this._badly = badly;
  }

  apply(pokemon: Pokemon): void {
    let damage = Math.floor(pokemon.getStat('hp') / 8);
    if (this._badly) {
      damage = Math.floor(pokemon.getStat('hp') * this._badlyDamageRatio);
      if (damage < 15 * Math.floor(pokemon.getStat('hp') / 16)) {
        this._badlyDamageRatio += 1 / 16;
      }
    }
    pokemon
      .getEndOfTurnEffects()
      .push(new DamageEffect(undefined, damage, `${pokemon.getName()} is hurt by poison!`));
  }

  toString(): string {
    return this._badly ? 'tox' : 'psn';
  }
}
