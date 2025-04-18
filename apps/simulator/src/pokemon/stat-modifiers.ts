import { clamp } from '../utils';
import { StatName } from './stats';

export type StatModifierName = StatName | 'accuracy' | 'evasion' | 'critical';

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
  private _stages: Record<StatModifierName, number> = {
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

  addStage(stat: StatModifierName, stage: number): void {
    if (stat === 'critical') {
      this._stages[stat] = clamp(this._stages[stat] + stage, 0, 3);
    } else {
      this._stages[stat] = clamp(this._stages[stat] + stage, -6, 6);
    }
  }

  getStage(stat: StatModifierName): number {
    return this._stages[stat];
  }

  getModifier(stat: StatModifierName): number {
    const stage = this.getStage(stat);
    return stat === 'accuracy' || stat === 'evasion'
      ? calculateAccuracyEvasionModifier(stage)
      : calculateBaseStatModifier(stage);
  }
}
