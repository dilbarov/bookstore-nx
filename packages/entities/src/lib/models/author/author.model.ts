import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from '../base';
import { IAuthor } from '../../interfaces';

@ObjectType()
export class AuthorModel extends BaseModel implements IAuthor {
  @Field()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @Field()
  @IsString()
  public lastName: string;

  public constructor() {
    super();
  }
}
