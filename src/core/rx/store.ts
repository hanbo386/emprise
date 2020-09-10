import { Action } from "./models";
import { Observable, Observer, Operator } from 'rxjs';
import { State, StateObservable } from './state';
import { ActionsSubject } from './action_subject';
import { ReducerManager } from './reducer_manager';
import { Injectable, Provider } from '@nestjs/common';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

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

    select<K>(mapFn: (state: T) => K): Observable<K>;

    // todo what does props mean?
    select<Props = any, K = any>(
      pathOrMapFn: ((state: T, props?: Props) => K) | string,
      ...path: string[]
    ): Observable<any> {
        return (select as any).call(null, pathOrMapFn, ...path)(this);
    }

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

export function select<T, Props, K>(
  pathOrMapFn: ((state: T, props?: Props) => any) | string,
  propsOrPath?: Props | string,
  ...paths: string[]
){
    return function selectOperator(source$: Observable<T>): Observable<K> {
        let mapped$: Observable<any>;

        if (typeof pathOrMapFn === 'string') {
            // todo don't quite get it
            const pathSlices = [<string>propsOrPath, ...paths].filter(Boolean);
            mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
        } else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(
              map((source) => pathOrMapFn(source, <Props>propsOrPath))
            );
        } else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
              ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    }
}
export const STORE_PROVIDERS: Provider[] = [Store];
