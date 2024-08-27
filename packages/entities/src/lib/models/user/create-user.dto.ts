import { filterFields } from '../../helpers/filter-fields';
import { InputType, PickType } from '@nestjs/graphql';

import { UserModel } from './user.model';

@InputType()
export class CreateUserDto extends PickType(UserModel, ['email', 'password']) {
  public constructor(partial: Partial<CreateUserDto> = {}) {
    super();
    Object.assign(this, filterFields<CreateUserDto>(partial, ['email', 'password']));
  }
}
