import { Pokemon } from '../pokemon';
import { Condition } from './condition';

export class FlinchCondition extends Condition {
  constructor() {
    super();
    this._priority = 1;
  }

  apply(pokemon: Pokemon): void {
    this._isActive = false;

    if (pokemon.isSkipTurn() || pokemon.isFirstToAttack()) {
      return;
    }

    console.log(`${pokemon.getName()} flinched!`);
    pokemon.setSkipTurn(true);
  }
}
