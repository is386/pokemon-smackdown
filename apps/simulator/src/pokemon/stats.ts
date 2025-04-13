import { clamp } from '../utils/math';

export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed';

export class Stats {
  private _stats: Record<StatName, number>;
  private _max: number = 0;

  constructor(
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
  ) {
    this._stats = {
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    };
  }

  getStat(stat: StatName): number {
    return this._stats[stat];
  }

  setStat(stat: StatName, value: number): void {
    this._stats[stat] = clamp(value, 0, this._max);
  }

  set max(num: number) {
    this._max = num;
  }
}
