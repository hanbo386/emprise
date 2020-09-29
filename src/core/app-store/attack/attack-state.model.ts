import { AttackShape } from '../../../game-components/attack/models/attack.model';

export interface AttackState extends Attacks<AliveAttack> {}

export interface Attacks<T> {
 [Key: string]: T
}

export interface AliveAttack {
  attackShape: AttackShape,
  forceLevel: number,
  sourceHeroId: string,
  destHeroIds: string[],
  destAttackIds: string[]
}
