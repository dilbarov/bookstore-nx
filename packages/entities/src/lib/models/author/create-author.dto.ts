import { Field, InputType } from '@nestjs/graphql';
import { filterFields } from '@bookstore-nx/microservices';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthorDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @Field()
  @IsString()
  public lastName: string;

  public constructor(partial: Partial<CreateAuthorDto> = {}) {
    Object.assign(this, filterFields<CreateAuthorDto>(partial, ['firstName', 'lastName']));
  }
}
