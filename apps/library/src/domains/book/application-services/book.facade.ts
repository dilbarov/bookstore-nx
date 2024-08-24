import { CreateBookDto, IBookQuery } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { BookAggregate } from '../domain/book.aggregate';
import { CreateBookCommand, CreateBookCommandHandler } from './commands';
import { GetBookQuery, GetBookQueryHandler, GetBooksQuery, GetBooksQueryHandler } from './queries';

@Injectable()
export class BookFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    createBook: (book: CreateBookDto) => this.createBook(book),
  };

  public queries = {
    getBookById: (id: string) => this.getBookById(id),
    getBooks: (query: IBookQuery) => this.getBooks(query),
  };

  public events = {};

  private createBook(book: CreateBookDto): Promise<BookAggregate> {
    const dto = new CreateBookDto(book);
    return this.commandBus.execute<CreateBookCommand, Awaited<ReturnType<CreateBookCommandHandler['execute']>>>(
      new CreateBookCommand(dto),
    );
  }

  private async getBookById(id: string): Promise<BookAggregate> {
    return await this.queryBus.execute<GetBookQuery, Awaited<ReturnType<GetBookQueryHandler['execute']>>>(
      new GetBookQuery(id),
    );
  }

  private async getBooks(query: IBookQuery): Promise<[BookAggregate[], number]> {
    return await this.queryBus.execute<GetBooksQuery, Awaited<ReturnType<GetBooksQueryHandler['execute']>>>(
      new GetBooksQuery(query),
    );
  }
}
