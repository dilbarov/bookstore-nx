import { UpdateFavoriteDto } from '@bookstore-nx/entities';

export class UpdateFavoriteCommand {
  public constructor(public readonly favorite: UpdateFavoriteDto) {}
}
