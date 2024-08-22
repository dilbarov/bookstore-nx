import { IUser } from '@bookstore-nx/entities';

import { UserAggregate } from '../domain/user.aggregate';

export abstract class UserRepository {
  public abstract findAll(): Promise<[UserAggregate[], number]>;

  public abstract findById(id: string): Promise<UserAggregate | null>;

  public abstract findByEmail(email: string): Promise<UserAggregate | null>;

  public abstract save(user: IUser): Promise<UserAggregate>;

  public abstract update(user: Pick<IUser, 'id'> & Partial<IUser>): Promise<UserAggregate>;
}
