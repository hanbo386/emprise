export interface IAttack {
  targetId: string,
  sourceId: string,
  attackInfo: string
}

export interface IInnerForce {
  forcePower: number
}

export interface IInnerForceField {

}

export enum IInnerForceType {
  YANG_FORCE = 1,
  YIN_FORCE = -1
}
