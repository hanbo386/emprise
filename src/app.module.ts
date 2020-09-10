import { Module } from '@nestjs/common';
import { StoreModule } from './core/rx/store_module';
import { AppService } from './app.service';
import { INITIAL_STATE } from './core/app-store/app-state.model';
import { rootReducer } from './core/app-store/root-reducer';
import { PositionFacade } from './core/app-store/position/position.facade';

@Module({
  imports: [
    StoreModule.forRoot(rootReducer, {initialState: INITIAL_STATE})
  ],
  providers: [
    AppService,
    PositionFacade
  ]
})
export class AppModule {}
