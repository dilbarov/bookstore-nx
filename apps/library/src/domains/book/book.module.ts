import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BOOK_COMMANDS_HANDLERS,
  BOOK_EVENTS_HANDLERS,
  BOOK_QUERIES_HANDLERS,
  BookFacade,
} from './application-services';
import { BookChannelsModule } from './channels/book-channels.module';
import { BookAdapter } from './providers/book.adapter';
import { BookRepository } from './providers/book.repository';
import { bookFacadeFactory } from './providers/book-facade.factory';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [CqrsModule, BookChannelsModule, MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [
    {
      provide: BookRepository,
      useClass: BookAdapter,
    },
    {
      provide: BookFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: bookFacadeFactory,
    },
    ...BOOK_COMMANDS_HANDLERS,
    ...BOOK_QUERIES_HANDLERS,
    ...BOOK_EVENTS_HANDLERS,
  ],
  exports: [BookFacade, BookRepository],
})
export class BookModule implements OnModuleInit {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public onModuleInit(): void {
    this.commandBus.register(BOOK_COMMANDS_HANDLERS);
    this.queryBus.register(BOOK_QUERIES_HANDLERS);
    this.eventBus.register(BOOK_EVENTS_HANDLERS);
  }
}
