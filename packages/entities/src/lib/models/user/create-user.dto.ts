import { filterFields } from '@bookstore-nx/microservices';
import { PickType } from '@nestjs/graphql';

import { UserModel } from './user.model';

export class CreateUserDto extends PickType(UserModel, ['email', 'password']) {
  public constructor(partial: Partial<CreateUserDto> = {}) {
    super();
    Object.assign(this, filterFields<CreateUserDto>(partial, ['email', 'password']));
  }
}
