import { ITokens } from '@bookstore-nx/entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class TokensDto implements ITokens {
  @Field()
  @IsString()
  @IsNotEmpty()
  public accessToken: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public refreshToken: string;
}
