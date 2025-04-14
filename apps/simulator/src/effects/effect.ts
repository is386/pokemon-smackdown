import { Pokemon } from '../pokemon';

export abstract class Effect {
  abstract apply(user: Pokemon, target: Pokemon): void;
}
