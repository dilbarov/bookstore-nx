import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const FAVORITE_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
