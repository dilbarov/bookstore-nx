import { Field, ObjectType } from '@nestjs/graphql';
import { BookModel } from './book.model';
import { IBook } from '../../interfaces';
import { IsEnum, IsOptional } from 'class-validator';
import { FavoriteBookCategory } from '../../interfaces';

@ObjectType()
export class BookResponse extends BookModel implements IBook {
  @Field(() => FavoriteBookCategory, { nullable: true })
  @IsOptional()
  @IsEnum(FavoriteBookCategory)
  public favoriteCategory: FavoriteBookCategory | null;

  public constructor() {
    super();
  }
}
