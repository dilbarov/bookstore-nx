import { filterFields } from '@bookstore-nx/microservices';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserModel } from '../../../user/domain/models/user.model';

@ObjectType()
export class LogoutDto extends PickType(UserModel, ['id']) {
  @Field()
  @IsString()
  @IsNotEmpty()
  public fingerprint: string;

  public constructor(partial: Partial<LogoutDto> = {}) {
    super();
    Object.assign(this, filterFields<LogoutDto>(partial, ['id', 'fingerprint']));
  }
}
