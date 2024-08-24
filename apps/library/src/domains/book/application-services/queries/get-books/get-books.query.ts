import { IBookQuery } from '@bookstore-nx/entities';

export class GetBooksQuery {
  public constructor(public readonly query: IBookQuery) {}
}
