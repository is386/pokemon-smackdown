import { Pokemon } from '../pokemon';
import { PoisonCondition } from '../status';
import { Status } from '../status';
import { Type } from '../type';
import { Effect } from './effect';

export class ApplyPoisonEffect extends Effect {
  private _badly: boolean;

  constructor(badly: boolean = false) {
    super();
    this._badly = badly;
  }

  apply(pokemon: Pokemon) {
    if (
      pokemon.getStatus() ||
      pokemon.getPrimaryType() === Type.Poison ||
      pokemon.getSecondaryType() === Type.Poison ||
      pokemon.getPrimaryType() === Type.Steel ||
      pokemon.getSecondaryType() === Type.Steel
    ) {
      return;
    }

    if (this._badly) {
      console.log(`${pokemon.getName()} was badly poisoned!`);
    } else {
      console.log(`${pokemon.getName()} was poisoned!`);
    }
    pokemon.setStatus(new Status(new PoisonCondition(this._badly)));
  }
}
