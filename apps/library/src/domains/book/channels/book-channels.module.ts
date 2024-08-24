import { Module } from '@nestjs/common';

import { BookConsumerService } from './book-consumer.service';

@Module({
  providers: [BookConsumerService],
})
export class BookChannelsModule {}
