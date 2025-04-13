import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { calculateAccuracyEvasionModifier } from '../pokemon/stat-modifiers';
import { Type } from '../type';
import { randomIntFromInterval } from '../utils';
import { clamp } from '../utils/math';

export type MoveCategory = 'physical' | 'special' | 'status';

export class Move {
  private _name: string;
  private _type: Type;
  private _category: MoveCategory;
  private _pp: number;
  private _maxPp: number;
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
    this._maxPp = pp;
    this._accuracy = accuracy;
    this._effects = effects;
  }

  get name(): string {
    return this._name;
  }

  get type(): Type {
    return this._type;
  }

  get category(): MoveCategory {
    return this._category;
  }

  set pp(num: number) {
    this._pp = num;
  }

  get pp(): number {
    return this._pp;
  }

  get maxPp(): number {
    return this._maxPp;
  }

  get accuracy(): number {
    return this._accuracy;
  }

  get effects(): Effect[] {
    return this._effects;
  }

  use(user: Pokemon, target: Pokemon): void {
    if (this._pp === 0) {
      console.log(`${user.name} cannot use that move!`);
      return;
    }

    this._pp = Math.max(0, this._pp - 1);

    const adjustedStages = clamp(
      user.getStatStage('accuracy') - target.getStatStage('evasion'),
      -6,
      6
    );
    const accuracyModified =
      this._accuracy * calculateAccuracyEvasionModifier(adjustedStages);
    const r = randomIntFromInterval(1, 100);

    if (r > accuracyModified) {
      console.log(`${user.name} missed!`);
      return;
    }

    this._effects.forEach((effect) => {
      effect.apply(this, user, target);
    });
  }
}
