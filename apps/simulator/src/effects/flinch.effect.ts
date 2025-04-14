import { Move } from '../moves';
import { Pokemon } from '../pokemon';
import { Effect } from './effect';

export class FlinchEffect extends Effect {
  apply(move: Move, user: Pokemon, target: Pokemon): void {
    console.log(`${target.name} flinched!`);
    target.skipTurn = true;
  }
}
