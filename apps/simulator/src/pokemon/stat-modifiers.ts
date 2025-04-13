import { BaseStatName } from './base-stats';

export type StatName = BaseStatName | 'accuracy' | 'evasion';

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

export function clampStage(stage: number): number {
  return Math.max(-6, Math.min(6, stage));
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
  };

  addStage(stat: StatName, stage: number): void {
    this._stages[stat] = clampStage(this._stages[stat] + stage);
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
