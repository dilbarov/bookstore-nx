import { IUser } from '@bookstore-nx/entities';
import { Injectable } from '@nestjs/common';

import { UserAggregate } from '../domain/user.aggregate';
import { UserRepository } from './user.repository';

@Injectable()
export class UserAdapter implements UserRepository {
  public findAll(): Promise<[UserAggregate[], number]> {
    return Promise.resolve([[], 0]);
  }

  public findByEmail(email: string): Promise<UserAggregate | null> {
    if (email) {
      return Promise.resolve(undefined);
    }
  }

  public findById(id: string): Promise<UserAggregate | null> {
    if (id) {
      return Promise.resolve(undefined);
    }
  }

  public save(user: IUser): Promise<UserAggregate> {
    if (user) {
      return Promise.resolve(undefined);
    }
  }

  public update(user: Pick<IUser, 'id'> & Partial<IUser>): Promise<UserAggregate> {
    if (user) {
      return Promise.resolve(undefined);
    }
  }
}
