import { Move } from '../moves';
import { Pokemon } from '../pokemon';

export abstract class Effect {
  abstract apply(move: Move, user: Pokemon, target: Pokemon): void;
}
