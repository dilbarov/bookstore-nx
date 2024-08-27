import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { filterFields } from '../../helpers/filter-fields';

@InputType()
export class UpdateFavoriteDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public entityId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  public userId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public category: string;

  public constructor(partial: Partial<UpdateFavoriteDto> = {}) {
    Object.assign(this, filterFields<UpdateFavoriteDto>(partial, ['userId', 'entityId', 'category']));
  }
}
