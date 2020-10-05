import { GamePosition } from '../../core/app-store/hero/hero-state.model';

export interface IHeroInitial {
  health: number,
  position: GamePosition,
  physicalRadius: number,
  speed: number,
  sensibleDistance: number,
  defendDistance: number,
  forceAmount: number,
  forceLevel: number,
  forceRecoverTime: number,
  forceSpeed: number
}

export const RANDOM_HEROES: IHeroInitial[] = [
  {
    health: 100,
    position: {x: 0, y: 0},
    physicalRadius: 5,
    speed: 1,
    sensibleDistance: 50,
    defendDistance: 20,
    forceAmount: 100,
    forceLevel: 30,
    forceRecoverTime: 20,
    forceSpeed: 3
  },
  {
    health: 100,
    position: {x: 0, y: 40},
    physicalRadius: 5,
    speed: 2,
    sensibleDistance: 20,
    defendDistance: 10,
    forceAmount: 20,
    forceLevel: 5,
    forceRecoverTime: 20,
    forceSpeed: 3
  }
];
