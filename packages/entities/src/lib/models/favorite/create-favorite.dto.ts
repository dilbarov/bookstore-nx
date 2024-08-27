import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { filterFields } from '../../helpers/filter-fields';

@InputType()
export class CreateFavoriteDto {
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
  public entityType: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public category: string;

  public constructor(partial: Partial<CreateFavoriteDto> = {}) {
    Object.assign(this, filterFields<CreateFavoriteDto>(partial, ['userId', 'entityId', 'entityType', 'category']));
  }
}
