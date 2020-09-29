import { AttackState } from './attack-state.model';
import { GameActions, RemoveAttackAction, UpdateAttackAction } from '../../../game-manager/game.action';

export function attackReducer(state: AttackState, action: GameActions): AttackState {
  if (action instanceof UpdateAttackAction) {
    let attacks = {...state};
    attacks[action.id] = {
      attackShape: action.attackShape,
      forceLevel: action.forceLevel,
      sourceHeroId: action.sourceHeroId,
      destHeroIds: action.destHeroIds,
      destAttackIds: action.destAttackIds
    };
    return attacks;
  } else if (action instanceof RemoveAttackAction) {
    let attacks = {...state};
    delete attacks[action.id];
    return attacks;
  }

  return state;
}
