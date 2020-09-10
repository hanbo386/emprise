import { ActionReducerMap } from '../rx/models';
import { AppState } from './app-state.model';
import { positionReducer } from './position/position.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  position: positionReducer,
};
