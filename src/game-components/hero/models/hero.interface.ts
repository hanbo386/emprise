import { IAttack } from '../../attack/models/attack.inferface';
import { GamePosition } from '../../core/app-store/position/position-state.model';

export interface IHero {
  id: string,
  position: GamePosition,
  abilities: HeroAbilities,
  attack: (targetId: string, sourceId: string) => void,
  defend: (attack: IAttack) => void,
  fightBack: () => void
}

export interface HeroAbilities {
  eyeSight: number
}
