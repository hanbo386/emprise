import { Action } from '../core/rx/models';
import { AttackShape } from '../game-components/attack/models/attack.model';
import { GamePosition } from '../core/app-store/hero/hero-state.model';

export const GET_HERO_STATE_ACTION = '[hero] get hero state action';
export const SET_HERO_STATE_ACTION = '[hero] set hero state action';
export const REMOVE_HERO_STATE_ACTION = '[hero] remove hero state action';

export const GET_HERO_POSITIONS_ACTION = '[hero] get hero positions action';
export const SET_HERO_POSITION_ACTION = '[hero] set hero position action';
export const REMOVE_HERO_POSITION_ACTION = '[hero] remove hero position action';

export const SET_ATTACK_ACTION = '[attack] set attack action';
export const REMOVE_ATTACK_ACTION = '[attack] remove attack action';


/*----------------Hero state actions-------------------*/
export class GetHeroStateAction implements Action {
  public readonly type = GET_HERO_STATE_ACTION;
}

export class SetHeroStateAction implements Action {
  public readonly type = SET_HERO_STATE_ACTION;
  constructor(public id: string, public position: GamePosition, public radius: number) {}
}

export class RemoveHeroStateAction implements Action {
  public readonly type = REMOVE_HERO_STATE_ACTION;
  constructor(public id: string) {}
}

/*---------------Hero position actions--------------------*/
// export class GetHeroPositionsAction implements Action{
//   public readonly type = GET_HERO_POSITIONS_ACTION;
// }
//
// export class GetHeroAttacksAction implements Action{
//   public readonly type = SET_HERO_POSITION_ACTION;
// }
//
// export class SetHeroPositionAction implements Action {
//   public readonly type = '[hero] set hero position action';
//   constructor(
//     public id: string,
//     public position: GamePosition
//   ) {}
// }

// export class RemoveHeroPositionAction implements Action {
//   public readonly type = REMOVE_HERO_POSITION_ACTION;
//   constructor (public id: string) {}
// }

/*-------------Attack actions----------------*/
export class UpdateAttackAction implements Action {
  public readonly type = SET_ATTACK_ACTION;
  constructor (
    public id: string,
    public attackShape: AttackShape,
    public forceLevel: number,
    public sourceHeroId: string,
    public destHeroIds: string[],
    public destAttackIds: string[]
  ) {}
}

export class RemoveAttackAction implements Action {
  public readonly  type = REMOVE_ATTACK_ACTION;
  constructor (public id: string) {}
}

export class DefaultAction implements Action{
  public readonly type = '[hero] default position'
}

export type GameActions = GetHeroStateAction
                          | SetHeroStateAction
                          | RemoveHeroStateAction
                          | UpdateAttackAction
                          | RemoveAttackAction;
