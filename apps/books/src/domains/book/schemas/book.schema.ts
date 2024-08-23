import { Document, Schema, Types } from 'mongoose';
import { IAuthorDocument } from '../../author/schemas/author.schema';

export interface IBookDocument extends Document {
  title: string;
  description: string;
  language: string;
  publicationDate: Date;
  author: IAuthorDocument;
  createdAt: Date;
  updatedAt: Date;
}

export const BookSchema = new Schema<IBookDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
});
