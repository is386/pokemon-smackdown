import { randomInt } from 'crypto';
import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { calculateAccuracyEvasionModifier } from '../pokemon/stat-modifiers';
import { Type } from '../type';
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

  getName(): string {
    return this._name;
  }

  getType(): Type {
    return this._type;
  }

  getCategory(): MoveCategory {
    return this._category;
  }

  setPp(num: number): void {
    this._pp = num;
  }

  getPp(): number {
    return this._pp;
  }

  getMaxPp(): number {
    return this._maxPp;
  }

  getAccuracy(): number {
    return this._accuracy;
  }

  getEffects(): Effect[] {
    return this._effects;
  }

  use(user: Pokemon, target: Pokemon): void {
    console.log(`${user.getName()} used ${this._name} on ${target.getName()}`);

    if (this._pp === 0) {
      console.log(`${user.getName()} cannot use that move!`);
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
    const r = randomInt(1, 101);

    if (r > accuracyModified && this._accuracy !== -1) {
      console.log(`${user.getName()} missed!`);
      return;
    }

    this._effects.forEach((effect) => {
      effect.apply(user, target);
    });
  }
}
