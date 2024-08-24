import { Field, Int, ObjectType } from '@nestjs/graphql';

import { AuthorModel } from './author.model';

@ObjectType()
export class AuthorsResponse {
  @Field(() => [AuthorModel])
  items: AuthorModel[];

  @Field(() => Int)
  count: number;
}
