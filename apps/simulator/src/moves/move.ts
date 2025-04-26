import { randomInt } from 'crypto';
import { Effect } from '../effects';
import { calculateAccuracyEvasionModifier, Pokemon } from '../pokemon';
import { Type, typeEffectiveness } from '../type';
import { DamageMove } from './damage.move';
import { MultiStrikeMove } from './multi-strike.move';
import { RecoilMove } from './recoil.move';
import { clamp } from '../utils';

export type AttackCategory = 'physical' | 'special';
export type AttackMove = DamageMove | RecoilMove | MultiStrikeMove;

export abstract class Move {
  protected _name: string;
  protected _type: Type;
  protected _pp: number;
  protected _maxPp: number;
  protected _accuracy: number;
  protected _userEffects: Effect[];
  protected _targetEffects: Effect[];
  protected _priority: number;

  constructor(
    name: string,
    type: Type,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[],
    priority: number = 0
  ) {
    this._name = name;
    this._type = type;
    this._pp = pp;
    this._maxPp = pp;
    this._accuracy = accuracy;
    this._userEffects = userEffects;
    this._targetEffects = targetEffects;
    this._priority = priority;
  }

  getName(): string {
    return this._name;
  }

  getType(): Type {
    return this._type;
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

  getUserEffects(): Effect[] {
    return this._userEffects;
  }

  getTargetEffects(): Effect[] {
    return this._targetEffects;
  }

  getPriority(): number {
    return this._priority;
  }

  protected _calculateAccuracy(user: Pokemon, target: Pokemon): number {
    const adjustedStages = clamp(
      user.getStatStage('accuracy') - target.getStatStage('evasion'),
      -6,
      6
    );
    return this._accuracy * calculateAccuracyEvasionModifier(adjustedStages);
  }

  protected _applyEffects(user: Pokemon, target: Pokemon): void {
    this._userEffects.forEach((effect) => effect.apply(user));
    this._targetEffects.forEach((effect) => effect.apply(target));
  }

  protected _hasNoEffect(target: Pokemon): boolean {
    const primaryType = target.getPrimaryType();
    const secondaryType = target.getSecondaryType();

    const effectiveness = (type: Type) => typeEffectiveness[this._type][type] ?? 1;

    const primaryEffectiveness = effectiveness(primaryType);
    const secondaryEffectiveness = secondaryType ? effectiveness(secondaryType) : 1;

    if (primaryEffectiveness === 2 || secondaryEffectiveness === 2) {
      console.log(`It's super effective!`);
      return false;
    }

    if (primaryEffectiveness === 0.5 || secondaryEffectiveness === 0.5) {
      console.log(`It's not very effective...`);
      return false;
    }

    if (primaryEffectiveness === 0 || secondaryEffectiveness === 0) {
      console.log(`It has no effect.`);
      return true;
    }

    return false;
  }

  use(user: Pokemon, target: Pokemon): boolean {
    // TODO: This should be moved to the child classes
    console.log(`${user.getName()} used ${this._name} on ${target.getName()}`);

    if (this._pp === 0) {
      console.log(`${user.getName()} cannot use that move!`);
      return false;
    }
    this._pp = Math.max(0, this._pp - 1);

    const accuracy = this._calculateAccuracy(user, target);
    if (randomInt(1, 101) > accuracy && this._accuracy !== -1) {
      console.log(`${user.getName()} missed!`);
      return false;
    }

    return true;
  }

  abstract copy(): Move;
}
