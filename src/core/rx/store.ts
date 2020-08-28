import { Action } from "./models";
import { Observable, Observer, Operator } from 'rxjs';
import { State, StateObservable } from './state';
import { ActionsSubject } from './action_subject';
import { ReducerManager } from './reducer_manager';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class Store<T> extends Observable<T> implements Observer<Action>{

    constructor (
        state$: StateObservable,
        private actionsObserver: ActionsSubject,
        private reducerManager: ReducerManager
    ) {
        super();
        this.source = state$; // what does the source do in
    }
    public dispatch<V extends Action = Action>(action: V): void {
        this.actionsObserver.next(action);
    };

    // implements methods from interface Observer
    public next(action: Action): void {
        this.actionsObserver.next(action);
    };

    public error(err: any): void {
        this.actionsObserver.error(err);
    }

    public complete(): void {
        this.actionsObserver.complete();
    }
    // end implements methods from interface Observer

    //region
    // addReducer() and removeReducer()
    //endregion
}


export const STORE_PROVIDERS: Provider[] = [Store];
