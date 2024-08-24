import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { filterFields } from '@bookstore-nx/microservices';

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
  @IsUUID()
  @IsNotEmpty()
  public authorId: string;

  public constructor(partial: Partial<CreateBookDto> = {}) {
    Object.assign(this, filterFields<CreateBookDto>(partial, ['title', 'description', 'language', 'authorId']));
  }
}
