import { IAuthor, IAuthorQuery } from '@bookstore-nx/entities';

import { AuthorAggregate } from '../domain/author.aggregate';

export abstract class AuthorRepository {
  public abstract findAll(query: IAuthorQuery): Promise<[AuthorAggregate[], number]>;

  public abstract findById(id: string): Promise<AuthorAggregate | null>;

  public abstract create(author: Pick<IAuthor, 'lastName' | 'firstName'>): Promise<AuthorAggregate>;

  public abstract save(author: IAuthor): Promise<AuthorAggregate>;

  public abstract update(id: string, author: Partial<IAuthor>): Promise<AuthorAggregate>;
}
