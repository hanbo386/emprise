import { PositionState } from './position-state.model';

export interface AppState {
  position: PositionState;
}

export const INITIAL_STATE: AppState = {
  position: { position: [0, 0] }
};
