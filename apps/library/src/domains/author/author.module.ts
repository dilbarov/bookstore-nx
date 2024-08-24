import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AUTHOR_COMMANDS_HANDLERS,
  AUTHOR_EVENTS_HANDLERS,
  AUTHOR_QUERIES_HANDLERS,
  AuthorFacade,
} from './application-services';
import { AuthorChannelsModule } from './channels/author-channels.module';
import { AuthorAdapter } from './providers/author.adapter';
import { AuthorRepository } from './providers/author.repository';
import { authorFacadeFactory } from './providers/author-facade.factory';
import { AUTHOR_MODEL_NAME, AuthorSchema } from './schemas/author.schema';

@Global()
@Module({
  imports: [
    CqrsModule,
    AuthorChannelsModule,
    MongooseModule.forFeature([
      {
        name: AUTHOR_MODEL_NAME,
        schema: AuthorSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: AuthorRepository,
      useClass: AuthorAdapter,
    },
    {
      provide: AuthorFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: authorFacadeFactory,
    },
    ...AUTHOR_COMMANDS_HANDLERS,
    ...AUTHOR_QUERIES_HANDLERS,
    ...AUTHOR_EVENTS_HANDLERS,
  ],
  exports: [AuthorFacade, AuthorRepository],
})
export class AuthorModule implements OnModuleInit {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public onModuleInit(): void {
    this.commandBus.register(AUTHOR_COMMANDS_HANDLERS);
    this.queryBus.register(AUTHOR_QUERIES_HANDLERS);
    this.eventBus.register(AUTHOR_EVENTS_HANDLERS);
  }
}
