import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const AUTH_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
