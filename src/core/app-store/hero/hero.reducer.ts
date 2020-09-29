import {
  GameActions, RemoveHeroStateAction,
  SetHeroStateAction,
} from '../../../game-manager/game.action';
import { HeroState } from './hero-state.model';

export function heroReducer(state: HeroState, action: GameActions): HeroState {
  if(action instanceof SetHeroStateAction) {
    let heroStates = {...state};
    heroStates[action.id] = {position: action.position, radius: action.radius};
    return heroStates;
  } else if (action instanceof RemoveHeroStateAction) {
    let heroStates = {...state};
    delete heroStates[action.id];
    return heroStates;
  }
  return state;
}
