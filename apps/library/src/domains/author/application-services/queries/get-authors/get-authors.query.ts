import { IAuthorQuery } from '@bookstore-nx/entities';

export class GetAuthorsQuery {
  public constructor(public readonly query: IAuthorQuery) {}
}
