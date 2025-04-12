export class BaseStats {
  private _hp: number;
  private _attack: number;
  private _defense: number;
  private _specialAttack: number;
  private _specialDefense: number;
  private _speed: number;

  constructor(
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
  ) {
    this._hp = hp;
    this._attack = attack;
    this._defense = defense;
    this._specialAttack = specialAttack;
    this._specialDefense = specialDefense;
    this._speed = speed;
  }

  get hp(): number {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = value;
  }

  get attack(): number {
    return this._attack;
  }

  set attack(value: number) {
    this._attack = value;
  }

  get defense(): number {
    return this._defense;
  }

  set defense(value: number) {
    this._defense = value;
  }

  get specialAttack(): number {
    return this._specialAttack;
  }

  set specialAttack(value: number) {
    this._specialAttack = value;
  }

  get specialDefense(): number {
    return this._specialDefense;
  }

  set specialDefense(value: number) {
    this._specialDefense = value;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }
}
