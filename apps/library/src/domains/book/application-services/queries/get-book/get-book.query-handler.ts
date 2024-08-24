import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookAggregate } from '../../../domain/book.aggregate';
import { BookRepository } from '../../../providers/book.repository';
import { GetBookQuery } from './get-book.query';

@QueryHandler(GetBookQuery)
export class GetBookQueryHandler implements IQueryHandler<GetBookQuery, BookAggregate> {
  public constructor(private readonly bookRepository: BookRepository) {}

  public async execute({ id }: GetBookQuery): Promise<BookAggregate> {
    return await this.bookRepository.findById(id);
  }
}
