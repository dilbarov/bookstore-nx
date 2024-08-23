import { UserModel, validateAggregationModel } from '@bookstore-nx/entities';
import { IUser } from '@bookstore-nx/entities';
import * as bcrypt from 'bcrypt';

export class UserAggregate extends UserModel {
  private _password: string | null = null;

  private constructor() {
    super();
  }

  public static create(user: Partial<IUser & { password?: string }>): UserAggregate {
    const _user = new UserAggregate();
    Object.assign(_user, user);

    _user.email = _user.email.toLowerCase();
    _user.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
    _user.updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date();

    validateAggregationModel(_user);
    _user._password = _user.password; // Store password for hashing
    delete _user.password; // Remove password for security reasons

    return _user;
  }

  public validateUserCredentials(password: string): boolean {
    return bcrypt.compareSync(password, this._password);
  }
}
