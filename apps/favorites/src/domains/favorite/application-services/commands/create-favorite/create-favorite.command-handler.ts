import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FavoriteAggregate } from '../../../domain/favorite.aggregate';
import { FavoriteRepository } from '../../../providers/favorite.repository';
import { CreateFavoriteCommand } from './create-favorite.command';

@CommandHandler(CreateFavoriteCommand)
export class CreateFavoriteCommandHandler implements ICommandHandler<CreateFavoriteCommand, FavoriteAggregate> {
  public constructor(private readonly favoriteRepository: FavoriteRepository) {}

  public async execute({ favorite }: CreateFavoriteCommand): Promise<FavoriteAggregate> {
    return await this.favoriteRepository.create(favorite);
  }
}
