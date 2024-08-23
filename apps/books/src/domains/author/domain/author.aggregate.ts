import { AuthorModel } from '../../../../../../packages/entities/src/lib/models/author/author.model';
import { IAuthor, validateAggregationModel } from '@bookstore-nx/entities';

export class AuthorAggregate extends AuthorModel {
  private constructor() {
    super();
  }

  public static create(author: IAuthor): AuthorAggregate {
    const _author = new AuthorAggregate();
    Object.assign(_author, author);

    _author.createdAt = author.createdAt ? new Date(author.createdAt) : new Date();
    _author.updatedAt = author.updatedAt ? new Date(author.updatedAt) : new Date();

    validateAggregationModel(_author);

    return _author;
  }
}
