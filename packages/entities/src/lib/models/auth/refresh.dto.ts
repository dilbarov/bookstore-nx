import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { filterFields } from '../../helpers/filter-fields';

@ObjectType()
export class RefreshDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fingerprint: string;

  public constructor(partial: Partial<RefreshDto> = {}) {
    Object.assign(this, filterFields<RefreshDto>(partial, ['refreshToken', 'fingerprint']));
  }
}
