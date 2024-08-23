import { IBase } from '../base';
import { IAuthor } from '../author';

export interface IBook extends IBase {
  title: string;
  description: string;
  language: string;
  publicationDate: Date;
  author: IAuthor;
}
