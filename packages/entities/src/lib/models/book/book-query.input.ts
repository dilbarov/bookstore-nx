import { Field, InputType, Int } from '@nestjs/graphql';
import { IBook, IBookQuery } from '@bookstore-nx/entities';

@InputType()
export class BookQueryInput implements IBookQuery {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field({ nullable: true })
  search?: string;

  @Field(() => [String], { nullable: true })
  authors?: string[];

  @Field(() => String, { nullable: true })
  orderBy?: keyof IBook;

  @Field(() => String, { nullable: true })
  orderDirection?: 'asc' | 'desc';
}
