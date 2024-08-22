import { IUser } from '@bookstore-nx/entities';
import { BaseModel } from '@bookstore-nx/microservices';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
