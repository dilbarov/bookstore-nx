import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookAggregate } from '../../../domain/book.aggregate';
import { BookRepository } from '../../../providers/book.repository';
import { GetBookByIdQuery } from './get-book-by-id.query';

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdQueryHandler implements IQueryHandler<GetBookByIdQuery, BookAggregate> {
  public constructor(private readonly bookRepository: BookRepository) {}

  public async execute({ id }: GetBookByIdQuery): Promise<BookAggregate> {
    return await this.bookRepository.findById(id);
  }
}
