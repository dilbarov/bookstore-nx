import { IFavorite, IFavoriteQuery } from '@bookstore-nx/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { FavoriteAggregate } from '../domain/favorite.aggregate';
import { FavoriteEntity } from '../entities/favorite.entity';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteAdapter implements FavoriteRepository {
  public constructor(
    @InjectRepository(FavoriteEntity) private readonly _favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  public async create(favorite: FavoriteAggregate): Promise<FavoriteAggregate> {
    return await this.save(favorite);
  }

  public async update(
    favorite: Pick<FavoriteAggregate, 'userId' | 'entityId' | 'category'>,
  ): Promise<FavoriteAggregate> {
    const existsFavorite = await this.findOne(favorite.userId, favorite.entityId);

    await this._favoriteRepository.save({ ...existsFavorite, category: favorite.category });

    return await this.findOne(favorite.userId, favorite.entityId);
  }

  public async delete(favorite: Pick<FavoriteAggregate, 'userId' | 'entityId'>): Promise<void> {
    await this._favoriteRepository.delete({ userId: favorite.userId, entityId: favorite.entityId });
  }

  public async findAll({
    userId,
    entityType,
    categories = [],
    entityIds = [],
  }: IFavoriteQuery): Promise<FavoriteAggregate[]> {
    const results = await this._favoriteRepository.find({
      where: {
        userId,
        entityType,
        category: categories.length > 0 ? In(categories) : undefined,
        entityId: entityIds.length > 0 ? In(entityIds) : undefined,
      },
    });

    return results.map(result => FavoriteAggregate.create(result));
  }

  public async findOne(userId: string, entityId: string): Promise<FavoriteAggregate> {
    const result = await this._favoriteRepository.findOne({
      where: {
        userId,
        entityId,
      },
    });

    if (!result) {
      return null;
    }

    return FavoriteAggregate.create(result);
  }

  private async save(entity: IFavorite): Promise<FavoriteAggregate> {
    const result = await this._favoriteRepository.save(entity);
    return await this.findOne(result.userId, result.entityId);
  }
}
