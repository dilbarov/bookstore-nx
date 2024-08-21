import { Module } from '@nestjs/common';

import { UserConsumerService } from './user-consumer.service';

@Module({
  providers: [UserConsumerService],
})
export class UserChannelsModule {}
