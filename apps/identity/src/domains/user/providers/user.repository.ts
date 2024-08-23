import { IUser, IUserQuery } from '@bookstore-nx/entities';

import { UserAggregate } from '../domain/user.aggregate';

export abstract class UserRepository {
  public abstract findAll(query: IUserQuery): Promise<[UserAggregate[], number]>;

  public abstract findById(id: string): Promise<UserAggregate | null>;

  public abstract findByEmail(email: string): Promise<UserAggregate | null>;

  public abstract create(user: IUser & { password: string }): Promise<UserAggregate>;

  public abstract save(user: IUser): Promise<UserAggregate>;

  public abstract update(id: string, user: Partial<IUser>): Promise<UserAggregate>;
}
