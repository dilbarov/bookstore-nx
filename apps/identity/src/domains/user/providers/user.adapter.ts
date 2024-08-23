import { UserQuery } from '@bookstore-nx/entities';
import { IUser } from '@bookstore-nx/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';

import { UserAggregate } from '../domain/user.aggregate';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserAdapter implements UserRepository {
  public constructor(@InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>) {}

  public async findAll({ search, skip, take, orderDirection, orderBy }: UserQuery): Promise<[UserAggregate[], number]> {
    const order = orderBy
      ? {
          [orderBy]: orderDirection || 'asc',
        }
      : undefined;

    const [items, count] = await this._userRepository.findAndCount({
      where: {
        email: search ? `%${search}%` : undefined,
      },
      skip,
      take,
      order,
    });

    return [items.map(UserAggregate.create), count];
  }

  public async findByEmail(email: string): Promise<UserAggregate | null> {
    if (email.length === 0) {
      return null;
    }

    const result = await this._userRepository.findOne({ where: { email } });
    return UserAggregate.create(result);
  }

  public async findById(id: string): Promise<UserAggregate | null> {
    if (id.length === 0 || !isUUID(id)) {
      return null;
    }

    const result = await this._userRepository.findOne({ where: { id } });
    return UserAggregate.create(result);
  }

  public async create(entity: IUser & { password: string }): Promise<UserAggregate> {
    return await this.save(entity);
  }

  public async save(entity: IUser): Promise<UserAggregate> {
    const result = await this._userRepository.save(entity);
    return await this.findById(result.id);
  }

  public async update(id: string, entity: Partial<IUser>): Promise<UserAggregate> {
    await this._userRepository.update(id, { ...entity, updatedAt: new Date() });
    return await this.findById(id);
  }
}
