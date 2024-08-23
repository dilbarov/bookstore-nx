import { filterFields } from '@bookstore-nx/microservices';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserModel } from '../user/user.model';

@ObjectType()
export class LoginDto extends PickType(UserModel, ['email', 'password']) {
  @Field()
  @IsString()
  @IsNotEmpty()
  public fingerprint: string;

  public constructor(partial: Partial<LoginDto> = {}) {
    super();
    Object.assign(this, filterFields<LoginDto>(partial, ['email', 'password', 'fingerprint']));
  }
}
