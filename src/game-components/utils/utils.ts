import { GamePosition } from 'src/core/app-store/hero/hero-state.model';

export function getShortName(id: string) {
  if (id && id.length > 0) {
    const splitArray =id.split('-');
    return splitArray[splitArray.length - 1];
  }
  return id;
}

export function getDistance(p1: GamePosition, p2: GamePosition): number {
  if (p1 && p2) {
    return  Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
  return Number.MAX_SAFE_INTEGER;
}
