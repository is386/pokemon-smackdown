import { Move } from '../moves';
import { Type } from '../type';
import { BaseStatName, BaseStats } from './base-stats';
import { StatModifiers, StatName } from './stat-modifiers';

export class Pokemon {
  private _name: string;
  private _level: number;
  private _primaryType: Type;
  private _secondaryType: Type | undefined;
  private _currentHp: number;
  private _baseStats: BaseStats;
  private _statModifiers = new StatModifiers();
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
    this._currentHp = baseStats.getStat('hp');
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

  useMove(moveIndex: number, target: Pokemon): void {
    this._moves[moveIndex].use(this, target);
  }

  takeDamage(damage: number) {
    this._currentHp = Math.max(this._currentHp - damage, 0);
  }

  getBaseStatWithModifier(stat: BaseStatName): number {
    return stat === 'hp'
      ? this._currentHp
      : this._baseStats.getStat(stat) * this._statModifiers.getModifier(stat);
  }

  getStatModifier(stat: StatName): number {
    return this._statModifiers.getModifier(stat);
  }

  addStatStage(stat: StatName, stage: number): void {
    this._statModifiers.addStage(stat, stage);
  }
}
