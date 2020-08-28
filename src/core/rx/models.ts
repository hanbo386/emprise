export interface  Action {
    type: string;
}

export interface ActionReducer<T, V extends Action = Action> {
    (state: T | undefined, action: V): T;
}

// export interface ModuleWithProviders<T> {
//     module: Type<T>
// }
