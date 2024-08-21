import { IUser } from '@bookstore-nx/entities';
import { validateAggregationModel } from '@bookstore-nx/microservices';

import { UserModel } from './models/user.model';

export class UserAggregate extends UserModel {
  private constructor() {
    super();
  }

  public static create(user: Partial<IUser>): UserAggregate {
    const _user = new UserAggregate();
    Object.assign(_user, user);

    _user.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
    _user.updatedAt =
      user.id || !user.updatedAt ? new Date() : new Date(user.updatedAt);

    validateAggregationModel(_user);

    return _user;
  }
}
