import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppState } from '../core/app-store/app-state.model';
import { Store } from '../core/rx/store';
import {
  RemoveAttackAction,
  RemoveHeroStateAction,
  SetHeroStateAction,
  UpdateAttackAction,
} from './game.action';
import { AttackState } from '../core/app-store/attack/attack-state.model';
import { AttackShape } from '../game-components/attack/models/attack.model';
import { GamePosition, HeroState } from '../core/app-store/hero/hero-state.model';

@Injectable()
export class GameFacade {
  constructor (private _store: Store<AppState>) {}

  public getHeroStates (): Observable<HeroState> {
    return this._store.select(state => state.heroes);
  }

  public setHeroState (id: string, position: GamePosition, radius: number) {
    this._store.dispatch(new SetHeroStateAction(id, position, radius));
  }

  public removeHeroState (id: string) {
    this._store.dispatch(new RemoveHeroStateAction(id));
  }
  // public getHeroPositions (): Observable<HeroPositionState> {
  //   return this._store.select(state => state.heroPositions);
  // }
  //
  // public setPosition (id: string, position: GamePosition) {
  //   this._store.dispatch(new SetHeroPositionAction(id, position));
  // }
  //
  // public removePosition (id: string) {
  //   this._store.dispatch(new RemoveHeroPositionAction(id));
  // }

  public getAttacks (): Observable<AttackState> {
    return this._store.select(state => state.attacks);
  }

  public updateAttack (id: string,
                       attackShape: AttackShape,
                       forceLevel: number,
                       sourceHeroId: string,
                       targetHeroIds: string[],
                       targetAttackIds: string[]
  ) {

    this._store.dispatch(new UpdateAttackAction(id, attackShape, forceLevel, sourceHeroId, targetHeroIds, targetAttackIds))
  }

  public removeAttack (id: string) {
    this._store.dispatch(new RemoveAttackAction(id));
  }
}
