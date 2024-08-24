import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { AuthorModel } from '../author';
import { BaseModel } from '../base';
import { IBook } from '../../interfaces';

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

  @Field()
  @IsString()
  @IsNotEmpty()
  public language: string;

  @Field(() => AuthorModel)
  @ValidateNested({ each: true })
  @Type(() => AuthorModel)
  public author: AuthorModel;

  public constructor() {
    super();
  }
}
