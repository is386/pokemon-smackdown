import { DamageMove, RecoilMove } from '../moves';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { Effect } from './effect';

const nonFireMovesThatThaw = ['scald'];

export class DamageEffect extends Effect {
  private _move: DamageMove | RecoilMove | undefined;
  private _damage: number;
  private _message: string;

  constructor(move: DamageMove | RecoilMove | undefined, damage: number, message: string = '') {
    super();
    this._move = move;
    this._damage = damage;
    this._message = message;
  }

  apply(pokemon: Pokemon): void {
    this._applyThaw(pokemon);
    pokemon.takeDamage(this._damage);

    if (this._message) {
      console.log(this._message);
    }
  }

  private _applyThaw(pokemon: Pokemon): void {
    if (
      pokemon.getStatus()?.isFrozen() &&
      (this._move?.getType() === Type.Fire ||
        nonFireMovesThatThaw.includes(this._move?.getName().toLowerCase() ?? ''))
    ) {
      pokemon.setStatus(undefined);
      console.log(`${pokemon.getName()} thawed out!`);
    }
  }
}
