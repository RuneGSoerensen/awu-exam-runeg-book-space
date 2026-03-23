import type { Route } from "./+types/home";
import { getBooks } from "~/db/services/data.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const books = await getBooks();
  return { books };
}
export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="mx-auto max-w-3xl p-5">
      <h1 className="mb-6 text-3xl font-bold">Books</h1>

      {loaderData.books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="space-y-4">
          {loaderData.books.map((book) => (
            <li key={book.id} className="border-b pb-4">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
