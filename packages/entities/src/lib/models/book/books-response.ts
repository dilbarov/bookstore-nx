import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BookResponse } from './book-response';

@ObjectType()
export class BooksResponse {
  @Field(() => [BookResponse])
  items: BookResponse[];

  @Field(() => Int)
  count: number;
}
