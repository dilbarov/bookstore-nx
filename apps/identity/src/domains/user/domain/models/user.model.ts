import { IUser } from '@bookstore-nx/entities';
import { BaseModel } from '@bookstore-nx/microservices';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserModel extends BaseModel implements IUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public password?: string;

  public constructor() {
    super();
  }
}
