import { Move } from '../moves';
import { Type } from '../type';
import { BaseStats } from './base-stats';

export class Pokemon {
  private _name: string;
  private _level: number;
  private _primaryType: Type;
  private _secondaryType: Type | undefined;
  private _currentHp: number;
  private _baseStats: BaseStats;
  private _moves: Move[];

  constructor(
    name: string,
    level: number,
    primaryType: Type,
    secondaryType: Type | undefined,
    baseStats: BaseStats,
    moves: Move[]
  ) {
    this._name = name;
    this._level = level;
    this._primaryType = primaryType;
    this._secondaryType = secondaryType;
    this._currentHp = baseStats.hp;
    this._baseStats = baseStats;
    this._moves = moves;
  }

  get name(): string {
    return this._name;
  }

  get level(): number {
    return this._level;
  }

  get primaryType(): Type {
    return this._primaryType;
  }

  get secondaryType(): Type | undefined {
    return this._secondaryType;
  }

  get baseStats(): BaseStats {
    return this._baseStats;
  }

  get currentHp(): number {
    return this._currentHp;
  }

  useMove(moveIndex: number, target: Pokemon): void {
    this._moves[moveIndex].use(this, target);
  }

  takeDamage(damage: number) {
    this._currentHp = Math.max(this._currentHp - damage, 0);
  }
}
