import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const USER_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
