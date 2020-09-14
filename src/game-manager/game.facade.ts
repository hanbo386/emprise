import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppState } from '../app-store/app-state.model';
import { Store } from '../rx/store';
import { HeroPositionState } from '../app-store/position/position-state.model';
import { SetHeroPositionAction } from './game.action';

@Injectable()
export class GameFacade {
  constructor (private _store: Store<AppState>) {}

  public getHeroPositions (): Observable<HeroPositionState> {
    return this._store.select(state => state.heroPositions);
  }

  public setPosition (id: string, position: [number, number]) {
    this._store.dispatch(new SetHeroPositionAction(id, position));
  }

  public dispatchAttack () {

  }
}
