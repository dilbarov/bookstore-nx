import { IUser } from './user';

export interface IUserQuery {
  take?: number;
  skip?: number;
  search?: string;
  orderBy?: keyof IUser;
  orderDirection?: 'asc' | 'desc';
}
