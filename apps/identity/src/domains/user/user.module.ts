import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  USER_COMMANDS_HANDLERS,
  USER_EVENTS_HANDLERS,
  USER_QUERIES_HANDLERS,
  UserFacade,
} from './application-services';
import { UserChannelsModule } from './channels/user-channels.module';
import { UserEntity } from './entities/user.entity';
import { UserAdapter } from './providers/user.adapter';
import { UserRepository } from './providers/user.repository';
import { userFacadeFactory } from './providers/user-facade.factory';

@Global()
@Module({
  imports: [CqrsModule, UserChannelsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
    {
      provide: UserFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: userFacadeFactory,
    },
    ...USER_COMMANDS_HANDLERS,
    ...USER_QUERIES_HANDLERS,
    ...USER_EVENTS_HANDLERS,
  ],
  exports: [UserFacade, UserRepository],
})
export class UserModule implements OnModuleInit {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public onModuleInit(): void {
    this.commandBus.register(USER_COMMANDS_HANDLERS);
    this.queryBus.register(USER_QUERIES_HANDLERS);
    this.eventBus.register(USER_EVENTS_HANDLERS);
  }
}
