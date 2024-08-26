import { IBase } from '../base';
import { IAuthor } from '../author';

export interface IBook extends IBase {
  title: string;
  description: string;
  language: string;
  rating: number;
  url?: string;
  author: IAuthor;
}
