import { Pokemon } from '../pokemon';
import { Effect } from './effect';
import { SkipTurnEffect } from './skip-turn.effect';

export class FlinchEffect extends Effect {
  constructor(isAppliedToUser: boolean) {
    super(isAppliedToUser);
  }

  apply(user: Pokemon, target: Pokemon): void {
    target
      .getAfterStatusCheckEffects()
      .push(
        new SkipTurnEffect(
          this.isAppliedToUser,
          `${target.getName()} flinched!`
        )
      );
  }
}
