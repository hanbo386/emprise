import { DynamicModule, Module, Provider } from '@nestjs/common';
import { REDUCER_MANAGER_PROVIDERS } from './reducer_manager';
import { Store, STORE_PROVIDERS } from './store';
import { STATE_PROVIDERS } from './state';
import { ACTIONS_SUBJECT_PROVIDERS } from './action_subject';
import { _REDUCER_FACTORY, INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';
import { Action, ActionReducerMap, InitialState } from './models';
import { combineReducers, createReducerFactory } from './utils';

export interface StoreConfig<T, V extends Action = Action> {
  initialState?: InitialState<T>;
}

@Module({
  providers: [
    ...STORE_PROVIDERS,
    ...STATE_PROVIDERS,
    ...REDUCER_MANAGER_PROVIDERS,
    ...ACTIONS_SUBJECT_PROVIDERS,
  ],
  exports: [Store]
})

export class StoreModule{
  static  forRoot(
    reducers: ActionReducerMap<any, any>,
    config: StoreConfig<any, any>
  ):DynamicModule {
    return {
      module: StoreModule,
      providers: [
        { provide: INITIAL_STATE, useValue:config.initialState},
        { provide: INITIAL_REDUCERS, useValue: reducers },
        { provide: _REDUCER_FACTORY, useValue: combineReducers},
        { provide: REDUCER_FACTORY, useFactory: createReducerFactory, inject: [_REDUCER_FACTORY]}
      ]
    }
  }
}
