import { Effect } from '../effects';
import { Pokemon } from '../pokemon';
import {
  calculateAccuracyEvasionModifier,
  clampStage,
} from '../pokemon/stat-modifiers';
import { Type } from '../type';
import { randomIntFromInterval } from '../utils';

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
    console.log('===');
    console.log(`${user.name}: ${user.getBaseStatWithModifier('hp')}`);
    console.log(`${target.name}: ${target.getBaseStatWithModifier('hp')}`);
    console.log(`${user.name} used ${this._name} on ${target.name}`);

    const adjustedStages = clampStage(
      user.getStatStage('accuracy') - target.getStatStage('evasion')
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
