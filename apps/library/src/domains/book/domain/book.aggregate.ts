import { BookModel } from '@bookstore-nx/entities';
import { IBook, validateAggregationModel } from '@bookstore-nx/entities';

import { AuthorAggregate } from '../../author/domain/author.aggregate';

export class BookAggregate extends BookModel {
  private constructor() {
    super();
  }

  public static create(book: Partial<IBook>): BookAggregate {
    const _book = new BookAggregate();
    const _author = AuthorAggregate.create(book.author);
    Object.assign(_book, book);

    _book.author = _author;
    _book.language = book.language ? book.language.trim().toLowerCase() : '';
    _book.publicationDate = book.publicationDate ? new Date(book.publicationDate) : new Date();
    _book.createdAt = book.createdAt ? new Date(book.createdAt) : new Date();
    _book.updatedAt = book.updatedAt ? new Date(book.updatedAt) : new Date();

    validateAggregationModel(_book);

    return _book;
  }
}
