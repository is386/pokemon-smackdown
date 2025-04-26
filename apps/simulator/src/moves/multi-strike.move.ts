import { DamageEffect, Effect } from '../effects';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { calculateDamage } from '../utils';
import { AttackCategory, Move } from './move';

export class MultiStrikeMove extends Move {
  private _category: AttackCategory;
  private _power: number;
  private _hits: number;

  constructor(
    name: string,
    type: Type,
    category: AttackCategory,
    power: number,
    pp: number,
    accuracy: number,
    userEffects: Effect[],
    targetEffects: Effect[],
    hits: number = 0, // 0 means random between 2 and 5
    priority: number = 0
  ) {
    super(name, type, pp, accuracy, userEffects, targetEffects, priority);
    this._category = category;
    this._power = power;
    this._hits = hits;
  }

  getCategory(): AttackCategory {
    return this._category;
  }

  getPower(): number {
    return this._power;
  }

  use(user: Pokemon, target: Pokemon): boolean {
    if (!super.use(user, target) || this._hasNoEffect(target)) {
      return false;
    }
    this._applyMultiStrikeDamage(user, target);
    this._applyEffects(user, target);
    return true;
  }

  private _applyMultiStrikeDamage(user: Pokemon, target: Pokemon): void {
    const hits = this._calculateHits();
    for (let i = 0; i < hits; i++) {
      const damage = calculateDamage(this, user, target);
      new DamageEffect(this, damage).apply(target);
    }
    console.log(`Hit ${hits} time(s)!`);
  }

  private _calculateHits(): number {
    if (this._hits !== 0) {
      return this._hits;
    }
    const random = Math.random();
    if (random < 0.15) {
      return 5;
    } else if (random < 0.3) {
      return 4;
    } else if (random < 0.65) {
      return 3;
    } else {
      return 2;
    }
  }

  copy(): MultiStrikeMove {
    return new MultiStrikeMove(
      this._name,
      this._type,
      this._category,
      this._power,
      this._maxPp,
      this._accuracy,
      this._userEffects,
      this._targetEffects,
      this._hits,
      this._priority
    );
  }
}
