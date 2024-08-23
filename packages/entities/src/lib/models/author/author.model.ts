import { BaseModel, IAuthor } from '@bookstore-nx/entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class AuthorModel extends BaseModel implements IAuthor {
  @Field()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  public constructor() {
    super();
  }
}
