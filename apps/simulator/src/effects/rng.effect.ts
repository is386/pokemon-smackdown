import { Pokemon } from '../pokemon';
import { randomIntFromInterval } from '../utils';
import { Effect } from './effect';

export class RngEffect extends Effect {
  private chance: number;
  private effects: Effect[];

  constructor(chance: number, effects: Effect[]) {
    super();
    this.chance = chance;
    this.effects = effects;
  }

  apply(user: Pokemon, target: Pokemon): void {
    const roll = randomIntFromInterval(0, 101);
    if (roll < this.chance) {
      this.effects.forEach((effect) => {
        effect.apply(user, target);
      });
    }
  }
}
