import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';

import { UserModule } from '../user/user.module';
import {
  AUTH_COMMANDS_HANDLERS,
  AUTH_EVENTS_HANDLERS,
  AUTH_QUERIES_HANDLERS,
  AuthFacade,
} from './application-services';
import { AuthChannelsModule } from './channels/auth-channels.module';
import { authFacadeFactory } from './providers/auth-facade.factory';

@Global()
@Module({
  imports: [CqrsModule, AuthChannelsModule, UserModule],
  providers: [
    {
      provide: AuthFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: authFacadeFactory,
    },
    ...AUTH_COMMANDS_HANDLERS,
    ...AUTH_QUERIES_HANDLERS,
    ...AUTH_EVENTS_HANDLERS,
  ],
  exports: [AuthFacade],
})
export class AuthModule implements OnModuleInit {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public onModuleInit(): void {
    this.commandBus.register(AUTH_COMMANDS_HANDLERS);
    this.queryBus.register(AUTH_QUERIES_HANDLERS);
    this.eventBus.register(AUTH_EVENTS_HANDLERS);
  }
}
