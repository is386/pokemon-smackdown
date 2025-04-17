import { getMove } from './moves';
import { Stats, Pokemon } from './pokemon';
import { Type } from './type';

function turn(p1: Pokemon, p1Move: number, p2: Pokemon, p2Move: number): void {
  console.log('\n========================================================================\n');
  console.log(p1.toString());
  console.log();
  console.log(p2.toString());
  console.log();
  p1.useMove(p1Move, p2);
  p2.useMove(p2Move, p1);
}

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
    [getMove('poison powder'), getMove('growl')]
  );

  const p2 = new Pokemon(
    'Blastoise',
    100,
    Type.Ghost,
    undefined,
    new Stats(79, 83, 100, 85, 105, 78),
    new Stats(31, 31, 31, 31, 31, 31),
    new Stats(0, 0, 0, 0, 0, 0),
    'hardy',
    [getMove('growl')]
  );

  turn(p1, 0, p2, 0);
  turn(p1, 1, p2, 0);
  turn(p1, 1, p2, 0);
  turn(p1, 1, p2, 0);
  turn(p1, 1, p2, 0);
}

main();
