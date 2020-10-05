import { GameFacade } from '../../game-manager/game.facade';
import { Guid } from 'guid-typescript';
import { AttackState } from '../../core/app-store/attack/attack-state.model';
import { AttackShape } from './models/attack.model';
import { GamePosition, HeroShape } from '../../core/app-store/hero/hero-state.model';
import { getDistance, getShortName } from '../utils/utils';

export class Attack {
  public targetHeroId: string;
  public targetAttackId: string;
  public sourceHeroId: string;
  public attackInfo: string;
  public forceLevel: number;
  public id: string;
  public origin: GamePosition;
  public speed: number;
  public attackShape: AttackShape;


  private _heroShapes;
  private _attacksAlive;
  private _timer;
  private _heroPositionSubscription;
  private _attackSubscription;
  private _lifeSpan: number = 20;
  private _radius: number = 0;

  public shortName: string;

  constructor (
    private _gameFacade: GameFacade,
    targetHeroId: string,
    targetAttackId: string,
    sourceHeroId: string,
    origin: GamePosition,
    speed: number,
    forceLevel: number) {

    this.targetHeroId = targetHeroId;
    this.targetAttackId = targetAttackId;
    this.sourceHeroId = sourceHeroId;

    this.id = Guid.create().toString();
    this.origin = {...origin};
    this.speed = speed;
    this.forceLevel = forceLevel;
    this.shortName = getShortName(this.id);

    this._attackSubscription =
      this._gameFacade.getAttacks()
        .pipe(
          // filter(attacks => attacks.)
        )
        .subscribe(attacks => {
          this.checkAttacks(attacks);
        });

    // update hero states
    this._heroPositionSubscription =
      this._gameFacade.getHeroStates()
        .subscribe(shapes => {
          this._heroShapes = shapes;
        });

    this.startTimer();
  }

  private startTimer() {
    this._timer = setInterval(() => {
      if (this._lifeSpan >= 0) {
        this._radius += this.speed;
        this._lifeSpan--;
        this.attackShape = {
          origin: this.origin,
          radius: this._radius
        };
        this._gameFacade.updateAttack(this.id, this.attackShape, this.forceLevel, this.sourceHeroId, [this.targetHeroId], [this.targetAttackId]);
        this.checkHeroPositions();
      } else {
        console.log(`Attack ${this.shortName} run out of lifespan. Self destroyed...`);
        this.cleanUpAttack();
      }
    }, 16);
  }

  // todo: remove use state directly here
  private checkAttacks (attacks: AttackState) {
    for(let id in attacks) {
      // target Hero or attack found
      if (attacks[id].destHeroIds.includes(this.sourceHeroId)
        || attacks[id].destAttackIds.includes(this.id)) {

        if (this.checkAttackHit(attacks[id].attackShape)) {
          console.log(`Attack ${this.shortName} hit another attack ${getShortName(id)}. radius: ${this._radius},${attacks[id].attackShape.radius}`);
          this.forceLevel = this.forceLevel - attacks[id].forceLevel;
          if (this.forceLevel <= 0) {
            console.log(`Attack ${this.shortName} vanished cause it's force level gone...`);
            this.cleanUpAttack();
          }
        }
        // check if current attack hits enemy's attack
        // check distance and determine if this attack hits enemy's attack
        // if (Math.abs(attacks[id].position[1] - this.position[1]) <= 1) {
        //   console.log(`Attack ${this.shortName} hits enemy's attack ${id}.`);
        //   const remainingForce = this.forceLevel - attacks[id].forceLevel;
        //   if (remainingForce <= 0) {
        //     console.log(`Attack ${this.shortName} is cleared by attack ${id}`);
        //     console.log('Going to destroy this attack...');
        //     this.cleanUpAttack();
        //     break;
        //   }
        // }
      }
    }
  }

  private checkHeroPositions () {
    for (let id in this._heroShapes) {
      if (id != this.sourceHeroId) {
        // check distance and determine if this attack hits enemy hero
        if (this.checkHitHero(this._heroShapes[id])) {
          console.log(`${getShortName(this.sourceHeroId)}'s attack ${this.shortName} hit hero ${getShortName(id)}. radius: ${this._radius}`);
          console.log('Going to destroy this attack...');
          this.cleanUpAttack();
          break;
        }
      }
    }
  }

  private checkHitHero(heroShape: HeroShape): boolean {
    if (heroShape) {
      const originDistance = getDistance(this.origin, heroShape.position);
      return originDistance <= (this._radius + heroShape.radius);
    }
    return false;
  }

  private checkAttackHit(attackShape: AttackShape): boolean {
    if (attackShape) {
      const originDistance = getDistance(this.origin, attackShape.origin);
      return originDistance <= (this._radius + attackShape.radius);
    }
    return false;
  }

  private removeSelfFromStore () {
    this._gameFacade.removeAttack(this.id);
  }

  private cleanUpAttack () {
    clearInterval(this._timer);
    this._heroPositionSubscription.unsubscribe();
    this._attackSubscription.unsubscribe();
    this.removeSelfFromStore();
  }
  // private update () {
  //   this._timer = setInterval(() => {
  //     if (this._lifeSpan <= 0) {
  //       this.cleanUpAttack();
  //       console.log(`Attack ${this.id} out of life span. Got cleaned up........`);
  //       return;
  //     }
  //     this.position[1] += this.speed;
  //     this._gameFacade.updateAttack(this.id,
  //       {}
  //       [this.position[0], this.position[1]],
  //       this.forceLevel,
  //       this.sourceHeroId,
  //       [this.targetHeroId],
  //       [this.targetAttackId]);
  //     this._lifeSpan--;
  //   }, 16);
  //
  // }
}
