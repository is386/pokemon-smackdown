import { clamp } from '../utils/math';
import { BaseStatName } from './base-stats';

export type StatName = BaseStatName | 'accuracy' | 'evasion' | 'critical';

function calculateBaseStatModifier(stage: number): number {
  if (stage >= 0) {
    return (2 + stage) / 2;
  }
  return 2 / (2 - stage);
}

export function calculateAccuracyEvasionModifier(stage: number): number {
  if (stage >= 0) {
    return (3 + stage) / 3;
  }
  return 3 / (3 - stage);
}

export class StatModifiers {
  private _stages: Record<StatName, number> = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    accuracy: 0,
    evasion: 0,
    critical: 0,
  };

  addStage(stat: StatName, stage: number): void {
    if (stat === 'critical') {
      this._stages[stat] = clamp(this._stages[stat] + stage, 0, 3);
    } else {
      this._stages[stat] = clamp(this._stages[stat] + stage, -6, 6);
    }
  }

  getStage(stat: StatName): number {
    return this._stages[stat];
  }

  getModifier(stat: StatName): number {
    const stage = this.getStage(stat);
    return stat === 'accuracy' || stat === 'evasion'
      ? calculateAccuracyEvasionModifier(stage)
      : calculateBaseStatModifier(stage);
  }
}
