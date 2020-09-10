export interface  Action {
    type: string;
}

export interface ActionReducer<T, V extends Action = Action> {
    (state: T | undefined, action: V): T;
}

// todo: the difference of using type and interface
export type ActionReducerMap<T, V extends Action = Action> = {
    [p in keyof T]: ActionReducer<T[p], V>;
};

export interface ActionReducerFactory<T, V extends Action = Action> {
    (
      // todo: why V is Action not ActionReducer?
      reducerMap: ActionReducerMap<T, V>,
      initialState?: InitialState<T>
    ): ActionReducer<T, V>;
}

// todo: what are these?
export type TypeId<T> = () => T;
export type InitialState<T> = Partial<T> | TypeId<Partial<T>> | void;
