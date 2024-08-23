import { IBook } from './book';

export interface IBookQuery {
  take?: number;
  skip?: number;
  search?: string;
  authors?: string[];
  orderBy?: keyof IBook;
  orderDirection?: 'asc' | 'desc';
}
