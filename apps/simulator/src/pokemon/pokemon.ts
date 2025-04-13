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
    this._currentHp = baseStats.getStat('hp'); // TODO: Use the HP formula
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
    console.log(
      '\n================================================================\n'
    );
    console.log(this.toString());
    console.log();
    console.log(target.toString());
    console.log();
    console.log(
      `${this._name} used ${this._moves[moveIndex].name} on ${target.name}`
    );
    this._moves[moveIndex].use(this, target);
  }

  takeDamage(damage: number) {
    this._currentHp = Math.max(this._currentHp - damage, 0);
  }

  getBaseStat(stat: BaseStatName): number {
    return this._baseStats.getStat(stat);
  }

  getBaseStatWithModifier(stat: BaseStatName): number {
    return stat === 'hp'
      ? this._currentHp
      : this._baseStats.getStat(stat) * this._statModifiers.getModifier(stat);
  }

  getStatStage(stat: StatName): number {
    return this._statModifiers.getStage(stat);
  }

  addStatStage(stat: StatName, stage: number): void {
    this._statModifiers.addStage(stat, stage);
  }

  toString(): string {
    const stages = `[atk:${this.getStatStage('attack')} def:${this.getStatStage('defense')} spa:${this.getStatStage('specialAttack')} spd:${this.getStatStage('specialDefense')} spe:${this.getStatStage('speed')} acc:${this.getStatStage('accuracy')} eva:${this.getStatStage('evasion')} crt:${this.getStatStage('critical')}]`;
    let s = `${this._name}: ${this.getBaseStatWithModifier('hp')} ${stages}`;
    this._moves.forEach((move) => {
      s += `\n - ${move.name} (${move.pp}/${move.maxPp})`;
    });
    return s;
  }
}
