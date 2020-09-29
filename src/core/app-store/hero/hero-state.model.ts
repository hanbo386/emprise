export interface HeroState extends Dictionary<HeroShape> { }

export type GamePosition  = {
  x: number,
  y: number
};

export type HeroShape = {
  position: GamePosition,
  radius: number
};

interface Dictionary<T> {
  [Key: string]: T
}
