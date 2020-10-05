import { IAttack } from '../../attack/models/attack.inferface';
import { GamePosition } from '../../../core/app-store/hero/hero-state.model';

export interface IHero {
  id: string,
  position: GamePosition,
  speed: number,
  forceLevel: number,
  health: number,
  startAttack: (targetId: string, targetAttackId: string) => string,
  defend: (attack: IAttack) => void,
  fightBack: () => void
}

export interface HeroAbilities {
  eyeSight: number
}
