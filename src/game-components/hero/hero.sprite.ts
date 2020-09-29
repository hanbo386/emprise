import { IHero } from './models/hero.interface';
import { Guid } from 'guid-typescript';
import { GameFacade } from '../../game-manager/game.facade';
import { filter, map } from 'rxjs/operators';
import { IAttack } from '../attack/models/attack.inferface';
import { Attack } from '../attack/attack.sprite';
import { AliveAttack, AttackState } from '../../core/app-store/attack/attack-state.model';
import { IHeroInitial } from './hero.config';
import { getDistance, getShortName } from '../utils/utils';
import { GamePosition, HeroShape, HeroState } from '../../core/app-store/hero/hero-state.model';
import { AttackShape } from '../attack/models/attack.model';

export class Hero implements IHero{
  id: string;
  position: GamePosition;
  speed: number;
  health: number = 10;

  sensibleDistance: number;
  forceLevel: number;
  forceSpeed: number;

  private _heroShapes: HeroState;
  private _timer;
  private _timeOut;
  private _positionSubscription;
  private _attackSubscription;
  private _allAttackIds: string[] = [];
  private _direction: number;
  private _physicalRadius: number;
  public shortName: string;
  private _attackAlready = false;

  constructor (
    private _gameFacade: GameFacade,
    heroInitial: IHeroInitial,
    direction: number = 0,
  ) {
    this.id = Guid.create().toString();
    this.position = heroInitial.position;
    this.sensibleDistance = heroInitial.sensibleDistance;
    this.forceLevel = heroInitial.forceLevel;
    this.forceSpeed = heroInitial.forceSpeed;
    this.health = heroInitial.health;
    this._physicalRadius = heroInitial.physicalRadius;
    this.shortName = getShortName(this.id);

    this._direction = direction;

    this._gameFacade.setHeroState(this.id, this.position, this._physicalRadius);
    this._positionSubscription = this._gameFacade.getHeroStates()
      .pipe(
        filter(shapes => {
          const keys = Object.keys(shapes);
          return keys.length > 0;
        })
      )
      .subscribe(shapes => {
        this._heroShapes = shapes;
      });

    this._attackSubscription = this._gameFacade.getAttacks()
      .pipe(
        filter(positions => {
          const keys = Object.keys(positions);
          return keys.length > 0;
        })
      )
      .subscribe(attacks => {
        this.checkAllAttacks(attacks);
      });


    this.startTimer();
  }

  // updatePosition (direction: number) {
  //   if(direction === 0) {
  //     this._timer = setInterval( () => this._gameFacade.setPosition(this.id, [0, this.position[1]++]), 16)
  //   } else {
  //     this._timer = setInterval( () => this._gameFacade.setPosition(this.id, [0, this.position[1]--]), 16)
  //   }
  // }

  startAttack(targetId: string) {
    const attack = new Attack(
      this._gameFacade,
      targetId,
      this.id,
      this.position,
      this.forceSpeed,
      this.forceLevel
    );

    console.log(`Hero ${this.shortName} starts a new attack ${getShortName(attack.id)}`);
    this._allAttackIds.push(attack.id);
  }

  defend (attack: IAttack) {
    console.log(`Hero ${this.shortName} is under attack! Attack info: ${attack.attackInfo}`);
  }

  fightBack () {
    // noop
  }

  private cleanUpHero () {
    this._positionSubscription.unsubscribe();
    this._attackSubscription.unsubscribe();
    if (this._timer) {
      clearInterval(this._timer);
    }
    if (this._timeOut) {
      clearTimeout(this._timeOut);
    }
    this._gameFacade.removeHeroState(this.id);
  }

  private startTimer() {
    this._timer = setInterval(() => {
      this.checkAllHeroPositions();
    }, 16);

    this._timeOut = setTimeout(() => {
      console.log(`Time out, hero ${this.shortName} destroying...`);
      this.cleanUpHero();
    }, 3000);
  }
  // todo: do not use state here
  private checkAllHeroPositions () {
    if (this._heroShapes) {
      for (let id in this._heroShapes) {
        if (id !== this.id) {
          if (this.getPhysicalDistance(this._heroShapes[id]) <= this.sensibleDistance) {
            this.startAttack(id);
          }
        }
      }
    }
  }

  private getPhysicalDistance(hero: HeroShape): number {
    // todo: how to check null?
    if (hero) {
      return (getDistance(this.position, hero.position) - Math.abs(this._physicalRadius - hero.radius));
    }
    return Number.MAX_SAFE_INTEGER;
  }

  // todo: do not use state here
  private checkAllAttacks (attacks: AttackState) {
    for (let id in attacks) {
      if (attacks[id].destHeroIds.includes(this.id)) {
        if (this.checkHitByAttack(attacks[id].attackShape)) {
          this.health -= attacks[id].forceLevel;
          console.log(`Hero ${this.shortName} is under attack from hero ${getShortName(attacks[id].sourceHeroId)}'s attack ${getShortName(id)}.`);
          console.log(`Current health is: ${this.health}`);
          if (this.health <= 0) {
            console.log(`Hero ${this.shortName} attacked to death.Going to clear up hero.`);
            this.cleanUpHero();
            console.log('Hero cleaned.----------------------------------------------------');
          }
        }
      }
    }
  }

  private checkHitByAttack(attackShape: AttackShape): boolean {
    if (attackShape) {
      const originDistance = getDistance(this.position, attackShape.origin);
      return originDistance <= (this._physicalRadius + attackShape.radius);
    }
    return false;
  }
}
