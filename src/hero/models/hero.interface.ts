import { IAttack } from '../../game-manager/game.model';

export interface IHero {
  id: string,
  position: [number, number],
  abilities: HeroAbilities,
  attack: (targetId: string, sourceId: string) => void,
  defend: (attack: IAttack) => void,
  fightBack: () => void
}

export interface HeroAbilities {
  eyeSight: number
}
