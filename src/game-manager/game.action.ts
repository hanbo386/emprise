import { Action } from '../rx/models';

export const GET_HERO_POSITIONS_ACTION = '[hero] get hero positions action';
export const SET_HERO_POSITION_ACTION = '[hero] get hero attacks action';

export class GetHeroPositionsAction implements Action{
  public readonly type = GET_HERO_POSITIONS_ACTION;
}

export class GetHeroAttacksAction implements Action{
  public readonly type = SET_HERO_POSITION_ACTION;
}

export class SetHeroPositionAction implements Action{
  public readonly type = '[hero] set hero position action';
  constructor(
    public id: string,
    public position: [number, number]) {}
}

export class DefaultAction implements Action{
  public readonly type = '[hero] default position'
}

export type GameActions = GetHeroPositionsAction | GetHeroAttacksAction | SetHeroPositionAction;
