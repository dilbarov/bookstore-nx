import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

import { IFavoriteQuery } from '../../interfaces';

@InputType()
export class FavoriteQueryInput implements IFavoriteQuery {
  @Field(() => String)
  @IsUUID()
  public userId: string;

  @Field(() => String)
  @IsString()
  public entityType: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  public entityIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsString()
  @IsOptional()
  public category?: string;
}
