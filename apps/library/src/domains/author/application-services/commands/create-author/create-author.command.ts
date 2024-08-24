import { CreateAuthorDto } from '@bookstore-nx/entities';

export class CreateAuthorCommand {
  public constructor(public readonly author: CreateAuthorDto) {}
}
