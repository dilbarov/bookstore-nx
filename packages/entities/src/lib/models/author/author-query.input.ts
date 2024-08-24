import { Field, InputType, Int } from '@nestjs/graphql';
import { IAuthor, IAuthorQuery } from '@bookstore-nx/entities';

@InputType()
export class AuthorQueryInput implements IAuthorQuery {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field({ nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  orderBy?: keyof IAuthor;

  @Field(() => String, { nullable: true })
  orderDirection?: 'asc' | 'desc';
}
