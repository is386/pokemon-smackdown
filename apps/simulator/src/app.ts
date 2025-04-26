import { getMove } from './moves';
import { Stats, Pokemon } from './pokemon';
import { Turn } from './turn';
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
    [getMove('bite')]
  );

  const p2 = new Pokemon(
    'Blastoise',
    100,
    Type.Ghost,
    undefined,
    new Stats(79, 83, 100, 85, 105, 300),
    new Stats(31, 31, 31, 31, 31, 31),
    new Stats(0, 0, 0, 0, 0, 0),
    'hardy',
    [getMove('growl')]
  );

  new Turn(p1, p2).execute(0, 0);
  new Turn(p1, p2).execute(0, 0);
}

main();
