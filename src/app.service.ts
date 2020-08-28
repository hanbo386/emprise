import { Injectable } from '@nestjs/common';
import { Store } from './core/rx/store';

@Injectable()
export class AppService {
  constructor(private _store: Store<any>) {}

  public startApp() {
    this._store.complete();
  }
}
