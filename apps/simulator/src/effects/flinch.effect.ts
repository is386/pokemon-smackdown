import { Pokemon } from '../pokemon';
import { Effect } from './effect';

export class FlinchEffect extends Effect {
  apply(user: Pokemon, target: Pokemon): void {
    console.log(`${target.name} flinched!`);
    target.skipTurn = true;
  }
}
