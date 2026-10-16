import { useState } from "react";
import type { View } from "../types";
import { books } from "../lib/books";
import { BookCard } from "./BookCard";

type CatalogProps = { setView: (view: View) => void };

export function Catalog({ setView }: CatalogProps) {
  const [query, setQuery] = useState("");

  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Catálogo</h2>
          <p className="text-slate-600">
            E-books da KODAROS para desenvolvedores.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Buscar título, autor ou categoria…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-kodaros-accent"
          />
        </div>
      </div>
      <button
        onClick={() => setView("cart")}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-slate-50 transition"
      >
        Ver carrinho <span aria-hidden="true">›</span>
      </button>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="col-span-full py-12 text-center text-slate-500">
            Nenhum e-book encontrado.
          </li>
        )}
      </ul>
    </section>
  );
}
