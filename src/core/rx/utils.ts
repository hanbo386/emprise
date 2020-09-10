import { Action, ActionReducer, ActionReducerFactory, ActionReducerMap, InitialState } from './models';

export function combineReducers(
  reducers: any,
  initialState: any = {},
): ActionReducer<any, Action> {
  const reducerKeys = Object.keys(reducers);
  const finalReducers: any = {};

  for(let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state, action) {
    state = state === undefined ? initialState : state;
    let hasChanged = false;
    const nextState: any = {};

    for(let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousSateForKey = state[key];
      const nextStateForKey = reducer(previousSateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousSateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

// todo: simplified version from NgRx
export function createReducerFactory<T, V extends Action = Action>(
  reducerFactory: ActionReducerFactory<T, V>
): ActionReducerFactory<T, V> {
  return (reducers: ActionReducerMap<T, V>, initialState?: InitialState<T>) => {
    const reducer = reducerFactory(reducers);
    return (state: T | undefined, action: V) => {
      state = state === undefined ? (initialState as T) : state;
      return reducer(state, action);
    }
  }
}
