import { Module } from '@nestjs/common';
import { AuthorConsumerService } from './author-consumer.service';

@Module({
  providers: [AuthorConsumerService],
})
export class AuthorChannelsModule {}
