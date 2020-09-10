import { BehaviorSubject, Observable, queueScheduler, Subscription } from 'rxjs';
import { Inject, Injectable, Provider } from '@nestjs/common';
import { ActionsSubject } from './action_subject';
import { ReducerObservable } from './reducer_manager';
import { INITIAL_STATE } from './tokens';
import { Action, ActionReducer } from './models';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';

export abstract class StateObservable extends Observable<any> {}

@Injectable()
export class State<T> extends BehaviorSubject<any> {
  private stateSubscription: Subscription;

  constructor(
    actions$: ActionsSubject,
    reducer$: ReducerObservable,
    //todo add scannedActionsSubject to support effects
    @Inject(INITIAL_STATE) initialState: any // todo need to provide the token in providers
  ) {
    super(initialState);

    console.log('state init.');
    const actionsOnQueue$: Observable<Action> = actions$.pipe(
      observeOn(queueScheduler)
    );

    const withLatestReducer$: Observable<[Action, ActionReducer<any, Action>]> =
      actionsOnQueue$.pipe(withLatestFrom(reducer$));

    const seed: StateActionPair<T> = { state: initialState };
    const stateAndAction$: Observable<{state: any; action?: Action}> =
      withLatestReducer$.pipe(
        scan(reduceState, seed)
      );

    this.stateSubscription = stateAndAction$.subscribe(({ state, action }) => {
      this.next(state); // so store.select can get the latest state slice
      // todo scannedActions
    });
    // todo unsubscribe
  }
}

export type StateActionPair<T, V extends Action = Action> = {
  state: T | undefined;
  action?: V;
}

export function reduceState<T, V extends Action = Action> (
  stateActionPair: StateActionPair<T, V> = { state: undefined },
  [action, reducer]: [V, ActionReducer<T, V>]
): StateActionPair<T, V> {
  const { state } = stateActionPair;
  return { state: reducer(state, action), action};
}

export const STATE_PROVIDERS: Provider[] = [
  State,
  { provide: StateObservable, useExisting: State }
];
