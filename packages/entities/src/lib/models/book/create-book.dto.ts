import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { filterFields } from '../../helpers/filter-fields';

@InputType()
export class CreateBookDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public language: string;

  @Field()
  @IsUrl()
  @IsOptional()
  public url?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  public authorId: string;

  public constructor(partial: Partial<CreateBookDto> = {}) {
    Object.assign(this, filterFields<CreateBookDto>(partial, ['title', 'description', 'language', 'authorId', 'url']));
  }
}
