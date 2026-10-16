import type { Ebook } from "../types";
import { formatMoney } from "../lib/currency";
import { useCart } from "../contexts/CartContext";

type BookCardProps = { book: Ebook };

export function BookCard({ book }: BookCardProps) {
  const { add } = useCart();

  return (
    <article className="flex flex-col h-full rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-center h-48 rounded-t-xl bg-slate-50 p-4 text-6xl">
        {book.cover}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-slate-900">{book.title}</h3>
        <p className="text-xs text-slate-500 mt-1">{book.author}</p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {book.description}
        </p>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-xl font-bold text-kodaros-accent">
            {formatMoney(book.priceCents)}
          </span>
          <span className="text-xs text-slate-400 align-top">
            {book.pages} págs. · {book.format}
          </span>
        </div>
        <button
          onClick={() => add(book)}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
