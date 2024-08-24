import { CreateBookDto } from '@bookstore-nx/entities';

export class CreateBookCommand {
  public constructor(public readonly book: CreateBookDto) {}
}
