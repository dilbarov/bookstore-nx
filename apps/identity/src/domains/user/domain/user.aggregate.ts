import { IUser } from '@bookstore-nx/entities';
import { validateAggregationModel } from '@bookstore-nx/microservices';
import * as bcrypt from 'bcrypt';

import { UserModel } from './models/user.model';

export class UserAggregate extends UserModel {
  private _password: string | null = null;

  private constructor() {
    super();
  }

  public static create(user: Partial<IUser>): UserAggregate {
    const _user = new UserAggregate();
    Object.assign(_user, user);

    _user.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
    _user.updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date();

    validateAggregationModel(_user);
    _user._password = _user.password; // Store password for hashing
    delete _user.password; // Remove password for security reasons

    return _user;
  }

  public comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this._password);
  }
}
