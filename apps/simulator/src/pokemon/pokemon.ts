import { Move } from '../moves';
import { Type } from '../type';
import { StatName, Stats } from './stats';
import { StatModifiers, StatModifierName } from './stat-modifiers';
import { Nature, natureMap, NatureStats } from './nature';
import { Status } from '../status/status';
import { Effect } from '../effects';

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
  private _selectedMove: Move | undefined;

  private _endOfTurnEffects: Effect[] = [];
  private _afterStatusCheckEffects: Effect[] = [];
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

  getName(): string {
    return this._name;
  }

  getLevel(): number {
    return this._level;
  }

  getPrimaryType(): Type {
    return this._primaryType;
  }

  getSecondaryType(): Type | undefined {
    return this._secondaryType;
  }

  getStatus(): Status | undefined {
    return this._status;
  }

  setStatus(value: Status | undefined): void {
    this._status = value;
  }

  isSkipTurn(): boolean {
    return this._skipTurn;
  }

  setSkipTurn(value: boolean): void {
    this._skipTurn = value;
  }

  getAfterStatusCheckEffects(): Effect[] {
    return this._afterStatusCheckEffects;
  }

  getEndOfTurnEffects(): Effect[] {
    return this._endOfTurnEffects;
  }

  getSelectedMove(): Move | undefined {
    return this._selectedMove;
  }

  useMove(moveIndex: number, target: Pokemon): void {
    this._selectedMove = this._moves[moveIndex];

    this._applyStatusConditionEffects();

    this._applyAfterStatusCheckEffects();

    if (!this._skipTurn) {
      this._selectedMove.use(this, target);
    }

    this._skipTurn = false;
    this._applyEndOfTurnEffects();
  }

  takeDamage(damage: number) {
    this._currentHp = Math.max(this._currentHp - damage, 0);
  }

  getStat(stat: StatName): number {
    const base = this._baseStats.getStat(stat);
    const iv = this._ivs.getStat(stat);
    const ev = this._evs.getStat(stat);
    let finalStat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * this._level) / 100);

    if (stat === 'hp') {
      finalStat += this._level + 10;
    } else {
      finalStat = (finalStat + 5) * this._natureStats[stat];
      if (stat === 'speed' && this._status?.isParalyzed) {
        console.log(finalStat);
        finalStat /= 2;
        console.log(finalStat);
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
      s += `\n - ${move.getName()} (${move.getPp()}/${move.getMaxPp()})`;
    });
    return s;
  }

  private _applyStatusConditionEffects(): void {
    if (this._status) {
      this._status.getCondition().apply(this);
    }
  }

  private _applyAfterStatusCheckEffects(): void {
    this._afterStatusCheckEffects.forEach((effect) => {
      effect.apply(this);
    });
    this._afterStatusCheckEffects = [];
  }

  private _applyEndOfTurnEffects(): void {
    this._endOfTurnEffects.forEach((effect) => {
      effect.apply(this);
    });
    this._endOfTurnEffects = [];
  }
}
