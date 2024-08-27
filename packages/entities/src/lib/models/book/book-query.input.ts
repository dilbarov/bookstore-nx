import { Field, InputType, Int } from '@nestjs/graphql';
import { filterFields } from '../../helpers/filter-fields';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { IBook, IBookQuery } from '../../interfaces';

@InputType()
export class BookQueryInput implements IBookQuery {
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

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  public authors?: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  public orderBy?: keyof IBook;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  public orderDirection?: 'asc' | 'desc';

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  public isFavorite?: boolean;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  public categories?: string[];

  public constructor(partial: Partial<BookQueryInput> = {}) {
    Object.assign(
      this,
      filterFields<BookQueryInput>(partial, ['take', 'skip', 'search', 'authors', 'orderBy', 'orderDirection']),
    );
  }
}
