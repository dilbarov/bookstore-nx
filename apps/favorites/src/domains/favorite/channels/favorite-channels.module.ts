import { Module } from '@nestjs/common';

import { FavoriteConsumerService } from './favorite-consumer.service';

@Module({
  providers: [FavoriteConsumerService],
})
export class FavoriteChannelsModule {}
