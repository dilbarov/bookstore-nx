import { IBook, IBookQuery } from '@bookstore-nx/entities';

import { BookAggregate } from '../domain/book.aggregate';

export abstract class BookRepository {
  public abstract findAll(query: IBookQuery): Promise<[BookAggregate[], number]>;

  public abstract findById(id: string): Promise<BookAggregate | null>;

  public abstract create(
    book: Pick<IBook, 'title' | 'description' | 'language'> & { authorId: string },
  ): Promise<BookAggregate>;

  public abstract save(book: IBook): Promise<BookAggregate>;

  public abstract update(id: string, book: Partial<IBook>): Promise<BookAggregate>;
}
