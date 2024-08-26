import { Field, InputType, Int } from '@nestjs/graphql';
import { filterFields } from '@bookstore-nx/microservices';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IBook, IBookQuery } from '../../interfaces';

@InputType()
export class BookQueryInput implements IBookQuery {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  take?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  skip?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  authors?: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  orderBy?: keyof IBook;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  orderDirection?: 'asc' | 'desc';

  public constructor(partial: Partial<BookQueryInput> = {}) {
    Object.assign(
      this,
      filterFields<BookQueryInput>(partial, ['take', 'skip', 'search', 'authors', 'orderBy', 'orderDirection']),
    );
  }
}
