import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AuthorAggregate } from '../../../domain/author.aggregate';
import { AuthorRepository } from '../../../providers/author.repository';
import { GetAuthorsQuery } from './get-authors.query';

@QueryHandler(GetAuthorsQuery)
export class GetAuthorsQueryHandler implements IQueryHandler<GetAuthorsQuery, [AuthorAggregate[], number]> {
  public constructor(private readonly authorRepository: AuthorRepository) {}

  public async execute({ query }: GetAuthorsQuery): Promise<[AuthorAggregate[], number]> {
    return await this.authorRepository.findAll(query);
  }
}
