import { randomInt } from 'crypto';
import { Pokemon } from '../pokemon';
import { StatModifierName } from '../pokemon/stat-modifiers';
import { typeEffectiveness } from '../type';
import { randomIntFromInterval } from '.';
import { DamageMove, RecoilMove } from '../moves';

function getCritMultiplier(stage: number): number {
  let chance: number;

  if (stage >= 3) {
    chance = 1.0;
  } else if (stage === 2) {
    chance = 0.5;
  } else if (stage === 1) {
    chance = 0.125;
  } else {
    chance = 0.0625;
  }

  const roll = randomInt(0, 100) / 100;
  return roll < chance ? 2 : 1;
}

export function calculateDamage(
  move: DamageMove | RecoilMove,
  user: Pokemon,
  target: Pokemon
): number {
  const category = move.getCategory();
  const type = move.getType();
  const power = move.getPower();

  const level = user.getLevel();

  const attackingStat: StatModifierName = category === 'physical' ? 'attack' : 'specialAttack';
  const defendingStat: StatModifierName = category === 'physical' ? 'defense' : 'specialDefense';

  let a = user.getStatWithModifier(attackingStat);
  let d = target.getStatWithModifier(defendingStat);

  const critical = getCritMultiplier(user.getStatStage('critical'));
  if (critical === 2) {
    const attackingStage = user.getStatStage(attackingStat);
    const defendingStage = target.getStatStage(defendingStat);

    if (attackingStage < 0) {
      a = user.getStat(attackingStat);
    }

    if (defendingStage > 0) {
      d = target.getStat(defendingStat);
    }
  }

  const random = randomIntFromInterval(85, 100) / 100;
  const stab = type === user.getPrimaryType() || type === user.getSecondaryType() ? 1.5 : 1;

  let typeDamage = typeEffectiveness[type][target.getPrimaryType()];
  const secondaryType = target.getSecondaryType();
  typeDamage *= secondaryType ? typeEffectiveness[type][secondaryType] : 1;

  const burn = user.getStatus()?.isBurned ? 0.5 : 1;

  const damage =
    (Math.floor(((Math.floor((2 * level) / 5) + 2) * power * (a / d)) / 50) + 2) *
    critical *
    random *
    stab *
    typeDamage *
    burn;

  // const damageMin = (damage / random) * (85 / 100);
  // const damageMax = damage / random;
  // console.log(Math.floor(damageMin), '-', Math.floor(damageMax));

  return Math.floor(damage);
}
