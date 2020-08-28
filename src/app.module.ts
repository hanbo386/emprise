import { Module } from '@nestjs/common';
import { StoreModule } from './core/rx/store_module';
import { AppService } from './app.service';

@Module({
  imports: [
    StoreModule
  ],
  providers: [AppService]
})
export class AppModule {}
