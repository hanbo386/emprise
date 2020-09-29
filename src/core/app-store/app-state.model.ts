import { AttackState } from './attack/attack-state.model';
import { HeroState } from './hero/hero-state.model';

export interface AppState {
  heroes: HeroState;
  attacks: AttackState
}

export const INITIAL_STATE: AppState = {
  heroes: {},
  attacks: {},
};
