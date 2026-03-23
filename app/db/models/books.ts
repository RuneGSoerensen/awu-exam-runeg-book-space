// Imports necessary modules from mongoose to define the schema and model for books in the database.
import { Schema, model, Types, type InferSchemaType } from "mongoose";

// Defines the schema for the Book model, specifying the structure and data types for each field in the book documents.
const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    genres: [{ type: String, required: true }],
    slug: { type: String, required: true, unique: true },
    pageCount: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    ratingsCount: { type: Number, default: 0 },
    tags: [{ type: String, required: true }],
    moods: [{ type: String, required: true }],
    coverImageUrl: { type: String },
  },
  { timestamps: true },
);

// Defines the TypeScript type for the Book model, combining the inferred schema type with an additional _id field of type ObjectId.
export type BookTypes = InferSchemaType<typeof bookSchema> & {
  _id: Types.ObjectId;
};

const Book = model<BookTypes>("Book", bookSchema);
export default Book;
