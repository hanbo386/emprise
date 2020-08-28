import {BehaviorSubject} from 'rxjs';
import {ActionReducer} from './models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReducerManager extends BehaviorSubject<any> {
  public tryReduce() {
    console.log('reduced.');
  }
}
