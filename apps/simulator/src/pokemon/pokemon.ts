import { Move } from '../moves';
import { Type } from '../type';
import { StatName, Stats } from './stats';
import { StatModifiers, StatModifierName } from './stat-modifiers';
import { Nature, natureMap, NatureStats } from './nature';
import { Status } from '../status/status';

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

  private _status: Status | undefined;
  private _skipTurn = false;

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

    this._currentHp = this.getStat('hp');
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

  set status(value: Status) {
    this._status = value;
  }

  set skipTurn(value: boolean) {
    this._skipTurn = value;
  }

  useMove(moveIndex: number, target: Pokemon): void {
    console.log(
      '\n========================================================================\n'
    );
    console.log(this.toString());
    console.log();
    console.log(target.toString());
    console.log();

    const move = this._moves[moveIndex];
    if (this._status) {
      this._status.condition.apply(this);
    }

    if (this._skipTurn) {
      this._skipTurn = false;
      return;
    }

    console.log(
      `${this._name} used ${this._moves[moveIndex].name} on ${target.name}`
    );
    move.use(this, target);
  }

  takeDamage(damage: number) {
    this._currentHp = Math.max(this._currentHp - damage, 0);
  }

  getStat(stat: StatName): number {
    const base = this._baseStats.getStat(stat);
    const iv = this._ivs.getStat(stat);
    const ev = this._evs.getStat(stat);
    let finalStat = Math.floor(
      ((2 * base + iv + Math.floor(ev / 4)) * this.level) / 100
    );

    if (stat === 'hp') {
      finalStat += this.level + 10;
    } else {
      finalStat = (finalStat + 5) * this._natureStats[stat];
      if (stat === 'speed' && this._status?.isParalyzed) {
        finalStat /= 2;
      }
    }
    return Math.floor(finalStat);
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
    const status = `${this._status?.toString().toUpperCase() ?? 'HEA'}`;
    let s = `${this._name}: ${this._currentHp}/${this.getStatWithModifier('hp')} ${status} ${stages}`;
    this._moves.forEach((move) => {
      s += `\n - ${move.name} (${move.pp}/${move.maxPp})`;
    });
    return s;
  }
}
