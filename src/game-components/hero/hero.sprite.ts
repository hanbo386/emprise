import { HeroAbilities, IHero } from './models/hero.interface';
import { Guid } from 'guid-typescript';
import { GameFacade } from '../game-manager/game.facade';
import { GamePosition, HeroPositionState } from '../core/app-store/position/position-state.model';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IAttack } from '../attack/models/attack.inferface';

export class Hero implements IHero{
  id: string;
  position: GamePosition;
  abilities: HeroAbilities;
  private interval;

  constructor (
    private _attackManager: BehaviorSubject<IAttack>,
    private _gameFacade: GameFacade,
    initialPosition: GamePosition = [0, 0],
    direction: number = 0
  ) {
    this.id = Guid.create().toString();
    this.position = initialPosition;

    this._gameFacade.getHeroPositions()
      .pipe(
        filter(positions => {
          const keys = Object.keys(positions);
          return keys.length > 0;
        })
      )
      .subscribe(heroPositions => {
        this.checkAllHeroPositions(heroPositions);
      });

    this._attackManager.pipe(
      // not initial value and not self raised
      filter(attack => attack.targetId !== '' && attack.sourceId !== this.id)
    ).subscribe(attack => {
      this.defend(attack);
    });

    this.updatePosition(direction);
  }

  updatePosition (direction: number) {
    if(direction === 0) {
      this.interval = setInterval( () => this._gameFacade.setPosition(this.id, [0, this.position[1]++]), 1000)
    } else {
      this.interval = setInterval( () => this._gameFacade.setPosition(this.id, [0, this.position[1]--]), 1000)
    }
  }

  attack(targetId: string, sourceId: string) {
    this._attackManager.next(
      {
        targetId: targetId,
        sourceId: this.id,
        attackInfo: `This is an attack from ${this.id}!`
      }
    );
  }

  defend (attack: IAttack) {
    console.log(`${this.id} is under attack! Attack info: ${attack.attackInfo}`);
  }

  fightBack () {
    // noop
  }

  private checkAllHeroPositions (heroPositions: HeroPositionState) {
    for (let id in heroPositions) {
      if (id !== this.id) {
        if (Math.abs(heroPositions[id][1] - this.position[1]) <= 50) {
          clearInterval(this.interval);
          this.attack(id, this.id);
        }
      }
    }
  }
}
