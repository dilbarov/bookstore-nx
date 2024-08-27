import { DeleteFavoriteDto } from '@bookstore-nx/entities';

export class DeleteFavoriteCommand {
  public constructor(public readonly favorite: DeleteFavoriteDto) {}
}
