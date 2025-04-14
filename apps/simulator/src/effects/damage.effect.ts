import { MoveCategory } from '../moves';
import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { calculateDamage } from './calculate-damage';
import { Effect } from './effect';

export class DamageEffect extends Effect {
  private _power: number;
  private _type: Type;
  private _category: MoveCategory;

  constructor(power: number, type: Type, category: MoveCategory) {
    super();
    this._power = power;
    this._type = type;
    this._category = category;
  }

  apply(user: Pokemon, target: Pokemon): void {
    target.takeDamage(
      calculateDamage(user, target, this._power, this._type, this._category)
    );
  }
}
