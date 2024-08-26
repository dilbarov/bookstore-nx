import { IAuthor, IAuthorQuery } from '@bookstore-nx/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

import { AuthorAggregate } from '../domain/author.aggregate';
import { AUTHOR_MODEL_NAME, IAuthorDocument } from '../schemas/author.schema';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorAdapter implements AuthorRepository {
  public constructor(@InjectModel(AUTHOR_MODEL_NAME) private readonly authorModel: Model<IAuthorDocument>) {}

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
      $or: [{ name: regex }],
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

  public async create(author: Pick<IAuthor, 'name'>): Promise<AuthorAggregate> {
    const createdAuthor = new this.authorModel(author);
    const result = await createdAuthor.save();
    return this.toAggregate(result);
  }

  public async save(author: IAuthor): Promise<AuthorAggregate> {
    const createdAuthor = new this.authorModel({ ...author, id: v4() });
    const result = await createdAuthor.save();
    return this.toAggregate(result);
  }

  public async update(id: string, author: Partial<IAuthor>): Promise<AuthorAggregate> {
    const updatedAuthor = await this.authorModel.findByIdAndUpdate(id, author, { new: true }).exec();
    return updatedAuthor ? this.toAggregate(updatedAuthor) : null;
  }

  private toAggregate(authorDoc: IAuthorDocument): AuthorAggregate {
    return AuthorAggregate.create({
      id: authorDoc._id,
      name: authorDoc.name,
      createdAt: authorDoc.createdAt,
      updatedAt: authorDoc.updatedAt,
    });
  }
}
