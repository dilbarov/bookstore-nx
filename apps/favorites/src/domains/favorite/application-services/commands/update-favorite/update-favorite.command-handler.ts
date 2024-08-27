import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FavoriteAggregate } from '../../../domain/favorite.aggregate';
import { FavoriteRepository } from '../../../providers/favorite.repository';
import { UpdateFavoriteCommand } from './update-favorite.command';

@CommandHandler(UpdateFavoriteCommand)
export class UpdateFavoriteCommandHandler implements ICommandHandler<UpdateFavoriteCommand, FavoriteAggregate> {
  public constructor(private readonly favoriteRepository: FavoriteRepository) {}

  public async execute({ favorite }: UpdateFavoriteCommand): Promise<FavoriteAggregate> {
    return await this.favoriteRepository.update(favorite);
  }
}
