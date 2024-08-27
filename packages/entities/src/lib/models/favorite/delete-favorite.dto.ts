import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { filterFields } from '../../helpers/filter-fields';

@InputType()
export class DeleteFavoriteDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public entityId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  public userId: string;

  public constructor(partial: Partial<DeleteFavoriteDto> = {}) {
    Object.assign(this, filterFields<DeleteFavoriteDto>(partial, ['userId', 'entityId']));
  }
}
