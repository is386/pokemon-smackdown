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
    new Stats(0, 0, 0, 0, 0, 0),
    'hardy',
    [getMove('ember'), getMove('thunder wave')]
  );

  const p2 = new Pokemon(
    'Blastoise',
    100,
    Type.Water,
    undefined,
    new Stats(79, 83, 100, 85, 105, 78),
    new Stats(31, 31, 31, 31, 31, 31),
    new Stats(0, 0, 0, 0, 0, 0),
    'hardy',
    [getMove('growl'), getMove('tackle')]
  );

  p1.useMove(0, p2);
  p2.useMove(0, p1);
  p2.useMove(0, p1);
  p2.useMove(0, p1);
  p2.useMove(0, p1);
  p1.useMove(1, p2);
  p2.useMove(1, p1);
}

main();
