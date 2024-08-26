import { Document, Schema } from 'mongoose';
import { v4 } from 'uuid';

export const AUTHOR_MODEL_NAME = 'Author';

export interface IAuthorDocument extends Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AuthorSchema = new Schema(
  {
    _id: { type: String, default: v4, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);
