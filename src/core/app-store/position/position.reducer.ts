import { PositionState } from '../position-state.model';
import { Action } from '../../rx/models';

export function positionReducer(state: PositionState, action: Action): PositionState {
  const newPosition:[number, number] = [state.position[0] + 1, state.position[1] + 1];
  return {position: newPosition};
}
