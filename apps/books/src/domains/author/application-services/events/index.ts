import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const AUTHOR_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
