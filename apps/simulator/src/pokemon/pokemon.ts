import { Move } from '../moves';
import { Type } from '../type';
import { StatName, Stats } from './stats';
import { StatModifiers, StatModifierName } from './stat-modifiers';
import { Nature, natureMap, NatureStats } from './nature';

export class Pokemon {
  private _name: string;
  private _level: number;
  private _primaryType: Type;
  private _secondaryType: Type | undefined;
  private _currentHp: number;
  private _baseStats: Stats;
  private _ivs: Stats;
  private _evs: Stats;
  private _natureStats: NatureStats;
  private _statModifiers = new StatModifiers();
  private _moves: Move[];

  constructor(
    name: string,
    level: number,
    primaryType: Type,
    secondaryType: Type | undefined,
    baseStats: Stats,
    ivs: Stats,
    evs: Stats,
    nature: Nature,
    moves: Move[]
  ) {
    this._name = name;
    this._level = level;
    this._primaryType = primaryType;
    this._secondaryType = secondaryType;
    this._currentHp = baseStats.getStat('hp'); // TODO: Use the HP formula

    this._baseStats = baseStats;
    this._baseStats.max = 999;

    this._ivs = ivs;
    this._ivs.max = 31;

    this._evs = evs;
    this._evs.max = 252;

    this._natureStats = natureMap.get(nature) ?? {
      attack: 1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1,
    };

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

  getStat(stat: StatName): number {
    const base = this._baseStats.getStat(stat);
    const iv = this._ivs.getStat(stat);
    const ev = this._evs.getStat(stat);
    const finalStat = Math.floor(
      ((2 * base + iv + Math.floor(ev / 4)) * this.level) / 100
    );
    return Math.floor(
      stat === 'hp'
        ? finalStat + this.level + 10
        : (finalStat + 5) * this._natureStats[stat]
    );
  }

  getStatWithModifier(stat: StatName): number {
    return stat === 'hp'
      ? this.getStat(stat)
      : this.getStat(stat) * this._statModifiers.getModifier(stat);
  }

  getStatStage(stat: StatModifierName): number {
    return this._statModifiers.getStage(stat);
  }

  addStatStage(stat: StatModifierName, stage: number): void {
    this._statModifiers.addStage(stat, stage);
  }

  toString(): string {
    const stages = `[atk:${this.getStatStage('attack')} def:${this.getStatStage('defense')} spa:${this.getStatStage('specialAttack')} spd:${this.getStatStage('specialDefense')} spe:${this.getStatStage('speed')} acc:${this.getStatStage('accuracy')} eva:${this.getStatStage('evasion')} crt:${this.getStatStage('critical')}]`;
    let s = `${this._name}: ${this.getStatWithModifier('hp')} ${stages}`;
    this._moves.forEach((move) => {
      s += `\n - ${move.name} (${move.pp}/${move.maxPp})`;
    });
    return s;
  }
}
