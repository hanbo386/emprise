import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { animationFrameScheduler, BehaviorSubject, Subscription } from 'rxjs';
import { GameFacade } from './game-manager/game.facade';
import { Hero } from './game-components/hero/hero.sprite';
import { IAttack } from './game-components/attack/models/attack.inferface';
import { RANDOM_HEROES } from './game-components/hero/hero.config';

@Injectable()
export class AppService implements OnModuleDestroy{

  private _positionSubscription$: Subscription;
  constructor(private _gameFacade: GameFacade) {}

  public startApp() {

    // animationFrameScheduler.schedule(() => console.log('fff'), 0, 0);


    // let attackManager = new BehaviorSubject<IAttack>({targetId: '', sourceId: '', attackInfo: ''});

    const randomHeroes = RANDOM_HEROES;
    const hero1 = new Hero(this._gameFacade, randomHeroes[0], 0);
    const hero2 = new Hero(this._gameFacade, randomHeroes[1], 1);

    // const tmp: HeroPositionState = {
    //   heroPositions: {
    //     '1': [1, 1],
    //     '2': [2, 2]
    //   }
    // };
    //
    // const mm = {...tmp};
    // console.log(mm);
    //
    // let po = [0, 0];
    // console.log(++po[1]);
    // console.log(++po[1]);
  }

  // todo: not called. why?
  onModuleDestroy(): any {
    this._positionSubscription$.unsubscribe();
    console.log('Finished.');
  }
}
