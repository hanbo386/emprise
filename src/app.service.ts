import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PositionFacade } from './core/app-store/position/position.facade';
import { Subscription } from 'rxjs';

@Injectable()
export class AppService implements OnModuleDestroy{

  private _positionSubscription$: Subscription;
  constructor(
    private _positionFacade: PositionFacade) {}

  public startApp() {
    this._positionSubscription$ = this._positionFacade.getPosition().subscribe(console.log);
    for(let i = 0; i < 10; i++) {
      setTimeout(() => this._positionFacade.dispatchPosition(), 1000 * i);
    }
  }

  // todo: not called. why?
  onModuleDestroy(): any {
    this._positionSubscription$.unsubscribe();
    console.log('Finished.');
  }
}
