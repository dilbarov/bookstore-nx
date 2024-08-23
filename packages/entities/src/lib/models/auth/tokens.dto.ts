import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ITokens } from '../../interfaces';

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
