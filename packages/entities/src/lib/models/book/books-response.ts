import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BookModel } from './book.model';

@ObjectType()
export class BooksResponse {
  @Field(() => [BookModel])
  items: BookModel[];

  @Field(() => Int)
  count: number;
}
