import { IUser } from '@bookstore-nx/entities';

export interface UserQuery {
  take?: number;
  skip?: number;
  search?: string;
  orderBy?: keyof IUser;
  orderDirection?: 'asc' | 'desc';
}
