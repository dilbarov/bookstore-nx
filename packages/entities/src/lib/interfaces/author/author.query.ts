import { IAuthor } from './author';

export interface IAuthorQuery {
  take?: number;
  skip?: number;
  search?: string;
  orderBy?: keyof IAuthor;
  orderDirection?: 'asc' | 'desc';
}
