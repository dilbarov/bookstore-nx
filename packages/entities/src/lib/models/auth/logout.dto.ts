import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { filterFields } from '../../helpers/filter-fields';
import { UserModel } from '../user';

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
