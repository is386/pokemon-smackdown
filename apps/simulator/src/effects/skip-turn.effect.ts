import { Pokemon } from '../pokemon';
import { Effect } from './effect';

export class SkipTurnEffect extends Effect {
  private _skipTurnMessage: string;

  constructor(skipTurnMessage: string) {
    super();
    this._skipTurnMessage = skipTurnMessage;
  }

  apply(user: Pokemon, target: Pokemon): void {
    if (!target.isSkipTurn()) {
      console.log(this._skipTurnMessage);
      target.setSkipTurn(true);
    }
  }
}
