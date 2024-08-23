import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IUser } from '../../interfaces';
import { BaseModel } from '../base';

@ObjectType()
export class UserModel extends BaseModel implements IUser {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field()
  @IsString()
  @IsOptional()
  public password?: string;

  public constructor() {
    super();
  }
}
