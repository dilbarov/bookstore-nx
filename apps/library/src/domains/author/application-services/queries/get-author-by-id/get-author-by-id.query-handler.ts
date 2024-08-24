import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AuthorAggregate } from '../../../domain/author.aggregate';
import { AuthorRepository } from '../../../providers/author.repository';
import { GetAuthorByIdQuery } from './get-author-by-id.query';

@QueryHandler(GetAuthorByIdQuery)
export class GetAuthorByIdQueryHandler implements IQueryHandler<GetAuthorByIdQuery, AuthorAggregate> {
  public constructor(private readonly authorRepository: AuthorRepository) {}

  public async execute({ id }: GetAuthorByIdQuery): Promise<AuthorAggregate> {
    return await this.authorRepository.findById(id);
  }
}
