import { Pokemon } from '../pokemon';

export abstract class Condition {
  abstract apply(pokemon: Pokemon): void;
  abstract toString(): string;
}
