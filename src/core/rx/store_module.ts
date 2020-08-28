import { Module } from '@nestjs/common';
import { ReducerManager } from './reducer_manager';
import { Store } from './store';
import { STATE_PROVIDERS } from './state';

@Module({
  providers: [
    Store,
    ReducerManager,
    ...STATE_PROVIDERS
  ],
  exports: [Store]
})
export class StoreModule{}
