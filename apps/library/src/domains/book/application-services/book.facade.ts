import { CreateBookDto, IBookQuery, UpdateBookDto } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { BookAggregate } from '../domain/book.aggregate';
import { CreateBookCommand, UpdateBookCommand } from './commands';
import { GetBookByIdQuery, GetBooksQuery } from './queries';

@Injectable()
export class BookFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    createBook: (book: CreateBookDto) => this.createBook(book),
    updateBook: (book: UpdateBookDto) => this.updateBook(book),
  };

  public queries = {
    getBookById: (id: string) => this.getBookById(id),
    getBooks: (query: IBookQuery) => this.getBooks(query),
  };

  public events = {};

  private createBook(book: CreateBookDto): Promise<BookAggregate> {
    const dto = new CreateBookDto(book);
    return this.commandBus.execute(new CreateBookCommand(dto));
  }

  private async updateBook(book: UpdateBookDto): Promise<BookAggregate> {
    const dto = new UpdateBookDto(book);
    return await this.commandBus.execute(new UpdateBookCommand(dto));
  }

  private async getBookById(id: string): Promise<BookAggregate> {
    return await this.queryBus.execute(new GetBookByIdQuery(id));
  }

  private async getBooks(query: IBookQuery): Promise<[BookAggregate[], number]> {
    return await this.queryBus.execute(new GetBooksQuery(query));
  }
}
