import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IFavorite } from '../../interfaces';

@ObjectType()
export class FavoriteModel implements IFavorite {
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
}
