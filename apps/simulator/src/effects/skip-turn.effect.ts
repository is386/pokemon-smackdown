import { Pokemon } from '../pokemon';
import { Effect } from './effect';

export class SkipTurnEffect extends Effect {
  private _message: string;

  constructor(message: string = '') {
    super();
    this._message = message;
  }

  apply(pokemon: Pokemon): void {
    if (!pokemon.isSkipTurn()) {
      if (this._message) {
        console.log(this._message);
      }
      pokemon.setSkipTurn(true);
    }
  }
}
