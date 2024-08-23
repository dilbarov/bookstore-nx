import { filterFields } from '@bookstore-nx/microservices';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserModel } from '../user';

@ObjectType()
export class LoginDto extends PickType(UserModel, ['email', 'password']) {
  @Field()
  @IsString()
  @IsNotEmpty()
  public fingerprint: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public password: string;

  public constructor(partial: Partial<LoginDto> = {}) {
    super();
    Object.assign(this, filterFields<LoginDto>(partial, ['email', 'password', 'fingerprint']));
  }
}
