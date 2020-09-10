import { BehaviorSubject, Observable } from 'rxjs';
import { ActionReducer, ActionReducerMap, ActionReducerFactory } from './models';
import { Injectable, Provider, Inject } from '@nestjs/common';
import { INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';

export abstract class ReducerObservable extends Observable<ActionReducer<any, any>>{}

@Injectable()
export class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
  constructor (
    @Inject(INITIAL_STATE) private initialState: any,
    @Inject(INITIAL_REDUCERS) private reducers: ActionReducerMap<any, any>,
    @Inject(REDUCER_FACTORY) private reducerFactory: ActionReducerFactory<any, any>,
  ) {
    // todo temp solution here, need to be replaced by a future implementation
    super(reducerFactory(reducers, initialState));
  }
}

export const REDUCER_MANAGER_PROVIDERS: Provider[] = [
  ReducerManager,
  {provide: ReducerObservable, useExisting: ReducerManager},
];
