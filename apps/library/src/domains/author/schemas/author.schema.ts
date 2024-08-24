import { Document, Schema } from 'mongoose';

export interface IAuthorDocument extends Document {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AuthorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
