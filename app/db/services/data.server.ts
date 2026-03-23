import Book from "../models/books";
import type { BookTypes } from "../models/books";

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedDate: Date;
  genres: string[];
  slug: string;
  pageCount: number;
  rating: number;
  ratingsCount: number;
  tags: string[];
  moods: string[];
  coverImageUrl?: string;
}

export async function getBooks(): Promise<BookRecord[]> {
  const books = await Book.find().exec();
  return books.map((book: BookTypes) => ({
    id: book._id.toString(),
    title: book.title,
    author: book.author,
    description: book.description,
    publishedDate: book.publishedDate,
    genres: book.genres,
    slug: book.slug,
    pageCount: book.pageCount,
    rating: book.rating,
    ratingsCount: book.ratingsCount,
    tags: book.tags,
    moods: book.moods,
    coverImageUrl: book.coverImageUrl ?? undefined,
  }));
}
