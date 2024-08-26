import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { filterFields } from '@bookstore-nx/microservices';
import { IAuthor, IAuthorQuery } from '../../interfaces';

@InputType()
export class AuthorQueryInput implements IAuthorQuery {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  public take?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  public skip?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public search?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  public orderBy?: keyof IAuthor;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  public orderDirection?: 'asc' | 'desc';

  public constructor(partial: Partial<AuthorQueryInput> = {}) {
    Object.assign(
      this,
      filterFields<AuthorQueryInput>(partial, ['take', 'skip', 'search', 'orderBy', 'orderDirection']),
    );
  }
}
