import { IBook, IBookQuery } from '@bookstore-nx/entities';
import { NotFoundError } from '@bookstore-nx/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { v4 } from 'uuid';

import { AUTHOR_MODEL_NAME, IAuthorDocument } from '../../author/schemas/author.schema';
import { BookAggregate } from '../domain/book.aggregate';
import { BOOK_MODEL_NAME, IBookDocument } from '../schemas/book.schema';
import { BookRepository } from './book.repository';

export class BookAdapter implements BookRepository {
  public constructor(
    @InjectModel(BOOK_MODEL_NAME) private readonly bookModel: Model<IBookDocument>,
    @InjectModel(AUTHOR_MODEL_NAME) private readonly authorModel: Model<IAuthorDocument>,
  ) {}

  public async create(
    book: Pick<IBook, 'title' | 'description' | 'language'> & { authorId: string },
  ): Promise<BookAggregate> {
    const { authorId, ...other } = book;

    const authorExists = await this.authorModel.exists({ _id: authorId });

    if (!authorExists) {
      throw new NotFoundError('Author not found');
    }

    const createdBook = new this.bookModel({ ...other, id: v4(), author: authorId, rating: 5.0 });
    const result = await createdBook.save();

    return await this.findById(result._id);
  }

  public async findAll({
    search,
    skip,
    take,
    orderDirection,
    orderBy,
    authors = [],
    books = [],
  }: IBookQuery): Promise<[BookAggregate[], number]> {
    const regex = new RegExp(search, 'i');
    const sortOrder = orderDirection === 'desc' ? -1 : 1;

    const whereOptions: FilterQuery<IBookDocument> = {
      title: regex,
    };

    if (authors.length > 0) {
      whereOptions.author = { $in: authors };
    }

    if (books.length > 0) {
      whereOptions._id = { $in: books };
    }

    const result = await this.bookModel
      .find(
        whereOptions,
        {},
        {
          skip,
          limit: take,
          sort: orderBy && { [orderBy]: sortOrder },
        },
      )
      .populate('author')
      .exec();

    const count = await this.bookModel.countDocuments(whereOptions).exec();
    return [result.map(book => this.toAggregate(book)), count];
  }

  public async findById(id: string): Promise<BookAggregate | null> {
    const book = await this.bookModel.findById(id).populate('author').exec();
    return book ? this.toAggregate(book) : null;
  }

  public async save(book: IBook): Promise<BookAggregate> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(book.id, book, { new: true }).populate('author').exec();
    return updatedBook ? this.toAggregate(updatedBook) : null;
  }

  public async update(id: string, book: Partial<IBook>): Promise<BookAggregate> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true }).populate('author').exec();
    return updatedBook ? this.toAggregate(updatedBook) : null;
  }

  private toAggregate(bookDoc: IBookDocument): BookAggregate {
    return BookAggregate.create({
      id: bookDoc._id,
      title: bookDoc.title,
      description: bookDoc.description,
      language: bookDoc.language,
      rating: bookDoc.rating,
      url: bookDoc.url,
      author: {
        id: bookDoc.author._id.toString(),
        name: bookDoc.author.name,
        createdAt: bookDoc.author.createdAt,
        updatedAt: bookDoc.author.updatedAt,
      },
      createdAt: bookDoc.createdAt,
      updatedAt: bookDoc.updatedAt,
    });
  }
}
