import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FavoriteRepository } from '../../../providers/favorite.repository';
import { DeleteFavoriteCommand } from './delete-favorite.command';

@CommandHandler(DeleteFavoriteCommand)
export class DeleteFavoriteCommandHandler implements ICommandHandler<DeleteFavoriteCommand> {
  public constructor(private readonly favoriteRepository: FavoriteRepository) {}

  public async execute({ favorite }: DeleteFavoriteCommand): Promise<void> {
    await this.favoriteRepository.delete(favorite);
  }
}
