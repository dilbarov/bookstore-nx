import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { filterFields } from '@bookstore-nx/microservices';

@InputType()
export class UpdateBookDto {
  @Field(() => ID)
  @IsUUID()
  public id: string;

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

  public constructor(partial: Partial<UpdateBookDto> = {}) {
    Object.assign(this, filterFields<UpdateBookDto>(partial, ['id', 'title', 'description', 'language', 'authorId']));
  }
}
