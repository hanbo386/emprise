import { BehaviorSubject } from 'rxjs';
import { Action } from './models';
import { Injectable, Provider } from '@nestjs/common';

export const INIT = '@rx/store/init' as '@rx/store/init';

@Injectable()
export class ActionsSubject extends BehaviorSubject<Action> {
  constructor() {
    super({type: INIT})
  }
}

export const ACTIONS_SUBJECT_PROVIDERS: Provider[] = [ActionsSubject];
