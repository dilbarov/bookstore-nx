import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const BOOK_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
