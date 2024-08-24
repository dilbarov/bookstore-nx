import { UpdateBookDto } from '@bookstore-nx/entities';

export class UpdateBookCommand {
  public constructor(public readonly book: UpdateBookDto) {}
}
