import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type } from '../type';

export enum MoveCategory {
  Physical,
  Special,
  Status,
}

export class Move {
  private _name: string;
  private _type: Type;
  private _category: MoveCategory;
  private _pp: number;
  private _accuracy: number;
  private _effects: Effect[];

  constructor(
    name: string,
    type: Type,
    category: MoveCategory,
    pp: number,
    accuracy: number,
    effects: Effect[]
  ) {
    this._name = name;
    this._category = category;
    this._type = type;
    this._pp = pp;
    this._accuracy = accuracy;
    this._effects = effects;
  }

  get type(): Type {
    return this._type;
  }

  get category(): MoveCategory {
    return this._category;
  }

  use(user: Pokemon, target: Pokemon): void {
    console.log(`${user.name}: ${user.currentHp}`);
    console.log(`${target.name}: ${target.currentHp}`);

    console.log(`${user.name} used ${this._name} on ${target.name}`);
    this._effects.forEach((effect) => {
      effect.apply(this, user, target);
    });

    console.log(`${user.name}: ${user.currentHp}`);
    console.log(`${target.name}: ${target.currentHp}`);
  }
}
