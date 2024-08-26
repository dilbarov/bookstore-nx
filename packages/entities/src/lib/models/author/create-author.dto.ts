import { Field, InputType } from '@nestjs/graphql';
import { filterFields } from '@bookstore-nx/microservices';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthorDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  public name: string;

  public constructor(partial: Partial<CreateAuthorDto> = {}) {
    Object.assign(this, filterFields<CreateAuthorDto>(partial, ['name']));
  }
}
