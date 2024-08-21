import { Module } from '@nestjs/common';

import { AuthConsumerService } from './auth-consumer.service';

@Module({
  providers: [AuthConsumerService],
})
export class AuthChannelsModule {}
