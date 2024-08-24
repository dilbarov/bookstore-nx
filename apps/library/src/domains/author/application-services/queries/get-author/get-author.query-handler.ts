import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AuthorAggregate } from '../../../domain/author.aggregate';
import { AuthorRepository } from '../../../providers/author.repository';
import { GetAuthorQuery } from './get-author.query';

@QueryHandler(GetAuthorQuery)
export class GetAuthorQueryHandler implements IQueryHandler<GetAuthorQuery, AuthorAggregate> {
  public constructor(private readonly authorRepository: AuthorRepository) {}

  public async execute({ id }: GetAuthorQuery): Promise<AuthorAggregate> {
    return await this.authorRepository.findById(id);
  }
}
