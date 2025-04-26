import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';

export class Turn {
  private _p1: Pokemon;
  private _p2: Pokemon;

  constructor(p1: Pokemon, p2: Pokemon) {
    this._p1 = p1;
    this._p2 = p2;
  }

  execute(p1MoveIndex: number, p2MoveIndex: number): void {
    console.log('\n========================================================\n');
    console.log(this._p1.toString());
    console.log();
    console.log(this._p2.toString());
    console.log();

    this._p1.selectMove(p1MoveIndex);
    this._p2.selectMove(p2MoveIndex);

    this._p1.setIsFirstToAttack(this._isFirstToAttack(this._p1, this._p2));
    this._p2.setIsFirstToAttack(this._isFirstToAttack(this._p2, this._p1));

    if (this._p1.isFirstToAttack()) {
      this._p1.useMove(this._p2);
      console.log();
      this._p2.useMove(this._p1);
    } else {
      this._p2.useMove(this._p1);
      console.log();
      this._p1.useMove(this._p2);
    }
  }

  private _isFirstToAttack(user: Pokemon, target: Pokemon): boolean {
    const userPriority = user.getSelectedMove()?.getPriority() ?? 0;
    const targetPriority = target.getSelectedMove()?.getPriority() ?? 0;

    if (userPriority !== targetPriority) {
      return userPriority > targetPriority;
    }

    const userSpeed = user.getStatWithModifier('speed');
    const targetSpeed = target.getStatWithModifier('speed');
    return userSpeed !== targetSpeed ? userSpeed > targetSpeed : randomIntFromInterval(1, 100) < 50;
  }
}
