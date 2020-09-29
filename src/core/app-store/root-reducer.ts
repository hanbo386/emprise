import { ActionReducerMap } from '../rx/models';
import { AppState } from './app-state.model';
import { attackReducer } from './attack/attack.reducer';
import { heroReducer } from './hero/hero.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  heroes: heroReducer,
  attacks: attackReducer
};
