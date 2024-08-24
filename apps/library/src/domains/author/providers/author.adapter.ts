import { IAuthor, IAuthorQuery } from '@bookstore-nx/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthorAggregate } from '../domain/author.aggregate';
import { IAuthorDocument } from '../schemas/author.schema';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorAdapter implements AuthorRepository {
  public constructor(@InjectModel('Author') private readonly authorModel: Model<IAuthorDocument>) {}

  public async findAll({
    search,
    skip,
    take,
    orderDirection,
    orderBy,
  }: IAuthorQuery): Promise<[AuthorAggregate[], number]> {
    const regex = new RegExp(search, 'i');
    const sortOrder = orderDirection === 'desc' ? -1 : 1;

    const whereOptions = {
      $or: [{ $and: [{ firstName: regex }, { lastName: regex }] }],
    };

    const authors = await this.authorModel
      .find(
        whereOptions,
        {},
        {
          skip,
          limit: take,
          sort: orderBy && { [orderBy]: sortOrder },
        },
      )
      .exec();
    const count = await this.authorModel.countDocuments(whereOptions).exec();
    return [authors.map(book => this.toAggregate(book)), count];
  }

  public async findById(id: string): Promise<AuthorAggregate | null> {
    const author = await this.authorModel.findById(id).exec();
    return author ? this.toAggregate(author) : null;
  }

  public async create(author: IAuthor): Promise<AuthorAggregate> {
    const createdAuthor = new this.authorModel(author);
    const result = await createdAuthor.save();
    return this.toAggregate(result);
  }

  public async save(author: IAuthor): Promise<AuthorAggregate> {
    const createdAuthor = new this.authorModel(author);
    const result = await createdAuthor.save();
    return this.toAggregate(result);
  }

  public async update(id: string, author: Partial<IAuthor>): Promise<AuthorAggregate> {
    const updatedAuthor = await this.authorModel.findByIdAndUpdate(id, author, { new: true }).exec();
    return updatedAuthor ? this.toAggregate(updatedAuthor) : null;
  }

  private toAggregate(authorDoc: IAuthorDocument): AuthorAggregate {
    return AuthorAggregate.create({
      id: authorDoc.id,
      firstName: authorDoc.firstName,
      lastName: authorDoc.lastName,
      createdAt: authorDoc.createdAt,
      updatedAt: authorDoc.updatedAt,
    });
  }
}
