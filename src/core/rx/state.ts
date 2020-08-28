import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, Provider } from '@nestjs/common';

export abstract class StateObservable extends Observable<any> {}

@Injectable()
export class State<T> extends BehaviorSubject<T> {

}

export const STATE_PROVIDERS: Provider[] = [
  State,
  { provide: StateObservable, useExisting: State }
];
