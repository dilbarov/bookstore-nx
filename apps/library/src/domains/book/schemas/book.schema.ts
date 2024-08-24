import { Document, Schema } from 'mongoose';

import { IAuthorDocument } from '../../author/schemas/author.schema';
import { v4 } from 'uuid';

export const BOOK_MODEL_NAME = 'Book';

export interface IBookDocument extends Document {
  _id: string;
  title: string;
  description: string;
  language: string;
  author: IAuthorDocument;
  createdAt: Date;
  updatedAt: Date;
}

export const BookSchema = new Schema<IBookDocument>(
  {
    _id: { type: String, default: v4, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    author: { type: String, ref: 'Author', required: true },
  },
  { timestamps: true },
);
