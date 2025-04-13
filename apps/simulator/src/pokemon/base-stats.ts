export type BaseStatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed';

export class BaseStats {
  private stats: Record<BaseStatName, number>;

  constructor(
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
  ) {
    this.stats = {
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    };
  }

  getStat(stat: BaseStatName): number {
    return this.stats[stat];
  }

  setStat(stat: BaseStatName, value: number): void {
    this.stats[stat] = value;
  }
}
