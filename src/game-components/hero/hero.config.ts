import { GamePosition } from '../../core/app-store/hero/hero-state.model';

export interface IHeroInitial {
  health: number,
  position: GamePosition,
  physicalRadius: number,
  speed: number,
  sensibleDistance: number,
  forceLevel: number,
  forceSpeed: number
}

export const RANDOM_HEROES: IHeroInitial[] = [
  {
    health: 100,
    position: {x: 0, y: 0},
    physicalRadius: 5,
    speed: 1,
    sensibleDistance: 50,
    forceLevel: 10,
    forceSpeed: 3
  },
  {
    health: 100,
    position: {x: 0, y: 40},
    physicalRadius: 5,
    speed: 2,
    sensibleDistance: 20,
    forceLevel: 5,
    forceSpeed: 3
  }
];
