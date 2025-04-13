import { getMove } from './moves';
import { Stats, Pokemon } from './pokemon';
import { Type } from './type';

function main(): void {
  const p1 = new Pokemon(
    'Charizard',
    100,
    Type.Fire,
    Type.Flying,
    new Stats(78, 84, 78, 109, 85, 100),
    new Stats(31, 31, 31, 31, 31, 31),
    new Stats(252, 252, 0, 0, 0, 4),
    [getMove('Tackle')]
  );

  const p2 = new Pokemon(
    'Blastoise',
    100,
    Type.Water,
    undefined,
    new Stats(79, 83, 100, 85, 105, 78),
    new Stats(31, 31, 31, 31, 31, 31),
    new Stats(252, 0, 252, 0, 0, 4),
    [getMove('Growl')]
  );

  p1.useMove(0, p2);
}

main();
