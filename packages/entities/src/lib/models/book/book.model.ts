import { BaseModel, IBook } from '@bookstore-nx/entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { AuthorModel } from '../author/author.model';

@ObjectType()
export class BookModel extends BaseModel implements IBook {
  @Field()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Field(() => String)
  @IsDate()
  @IsNotEmpty()
  public publicationDate: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  public language: string;

  @Field(() => AuthorModel)
  @ValidateNested()
  @Type(() => AuthorModel)
  public author: AuthorModel;

  public constructor() {
    super();
  }
}
