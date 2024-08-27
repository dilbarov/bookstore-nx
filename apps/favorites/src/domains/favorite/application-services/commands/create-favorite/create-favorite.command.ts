import { CreateFavoriteDto } from '@bookstore-nx/entities';

export class CreateFavoriteCommand {
  public constructor(public readonly favorite: CreateFavoriteDto) {}
}
