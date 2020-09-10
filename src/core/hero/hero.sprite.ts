import { Injectable } from '@nestjs/common';
import { HeroAbilities, IHero } from './models/hero.interface';
import { Guid } from 'guid-typescript';

@Injectable()
export class Hero implements IHero{
  id: string;
  position: [number, number];

  constructor () {
    // noop
  }


  abilities: HeroAbilities;
  attack: () => void;
  defend: () => void;
  fightBack: () => void;
}
