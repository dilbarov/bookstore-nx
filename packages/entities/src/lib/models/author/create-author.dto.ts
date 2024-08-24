import { PickType } from '@nestjs/graphql';
import { AuthorModel } from './author.model';
import { filterFields } from '@bookstore-nx/microservices';

export class CreateAuthorDto extends PickType(AuthorModel, ['firstName', 'lastName'] as const) {
  public constructor(partial: Partial<CreateAuthorDto>) {
    super();
    Object.assign(this, filterFields<CreateAuthorDto>(partial, ['firstName', 'lastName']));
  }
}
