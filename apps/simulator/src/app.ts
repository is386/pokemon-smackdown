import { getMove } from './moves';
import { BaseStats, Pokemon } from './pokemon';
import { Type } from './type';

function main(): void {
  const p1 = new Pokemon(
    'Charizard',
    100,
    Type.Fire,
    Type.Flying,
    new BaseStats(78, 84, 78, 109, 85, 100),
    [getMove('Tackle')]
  );

  const p2 = new Pokemon(
    'Blastoise',
    100,
    Type.Water,
    undefined,
    new BaseStats(79, 83, 100, 85, 105, 78),
    []
  );

  p1.useMove(0, p2);
}

main();
