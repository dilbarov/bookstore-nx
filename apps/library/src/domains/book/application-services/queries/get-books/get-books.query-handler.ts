import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookAggregate } from '../../../domain/book.aggregate';
import { BookRepository } from '../../../providers/book.repository';
import { GetBooksQuery } from './get-books.query';

@QueryHandler(GetBooksQuery)
export class GetBooksQueryHandler implements IQueryHandler<GetBooksQuery, [BookAggregate[], number]> {
  public constructor(private readonly bookRepository: BookRepository) {}

  public async execute({ query }: GetBooksQuery): Promise<[BookAggregate[], number]> {
    return await this.bookRepository.findAll(query);
  }
}
