import { Pokemon } from '../pokemon';

export abstract class Effect {
  abstract apply(pokemon: Pokemon): void;
}
