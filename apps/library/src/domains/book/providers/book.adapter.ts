import { IBook, IBookQuery } from '@bookstore-nx/entities';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BookRepository } from './book.repository';
import { BookAggregate } from '../domain/book.aggregate';
import { IBookDocument } from '../schemas/book.schema';

export class BookAdapter implements BookRepository {
  public constructor(@InjectModel('Book') private readonly bookModel: Model<IBookDocument>) {}

  public async create(book: IBook): Promise<BookAggregate> {
    const createdBook = new this.bookModel(book);
    const result = await createdBook.save();
    return this.toAggregate(result);
  }

  public async findAll({
    search,
    skip,
    take,
    orderDirection,
    orderBy,
    authors = [],
  }: IBookQuery): Promise<[BookAggregate[], number]> {
    const regex = new RegExp(search, 'i');
    const sortOrder = orderDirection === 'desc' ? -1 : 1;

    const whereOptions: FilterQuery<IBookDocument> = {
      $or: [{ title: regex }, { description: regex }],
    };

    if (authors.length > 0) {
      whereOptions.author = { $in: authors };
    }

    const qb = this.bookModel.find(whereOptions).populate('author');

    if (take) {
      qb.limit(take);
    }

    if (skip) {
      qb.skip(skip);
    }

    if (orderBy) {
      qb.sort({ [orderBy]: sortOrder });
    }

    const books = await qb.exec();
    const count = await this.bookModel.countDocuments(whereOptions).exec();
    return [books.map(book => this.toAggregate(book)), count];
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
      id: bookDoc.id,
      title: bookDoc.title,
      description: bookDoc.description,
      language: bookDoc.language,
      publicationDate: bookDoc.publicationDate,
      author: {
        id: bookDoc.author._id.toString(),
        firstName: bookDoc.author.firstName,
        lastName: bookDoc.author.lastName,
        createdAt: bookDoc.author.createdAt,
        updatedAt: bookDoc.author.updatedAt,
      },
      createdAt: bookDoc.createdAt,
      updatedAt: bookDoc.updatedAt,
    });
  }
}
