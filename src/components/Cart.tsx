import type { View } from "../types";
import { formatMoney } from "../lib/currency";
import { useCart } from "../contexts/CartContext";

type CartProps = { setView: (view: View) => void };

export function Cart({ setView }: CartProps) {
  const { items, remove, setQuantity, totalCents, isEmpty, clear } = useCart();

  if (isEmpty) {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Carrinho vazio</h2>
        <p className="text-slate-600 mt-2">Adicione e-books do catálogo para começar.</p>
        <button
          onClick={() => setView("catalog")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-slate-50 transition"
        >
          Voltar ao catálogo <span aria-hidden="true">›</span>
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Carrinho</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            key={item.ebook.id}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className="text-4xl">{item.ebook.cover}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-slate-900 truncate">
                {item.ebook.title}
              </h3>
              <p className="text-xs text-slate-500">{item.ebook.author}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(item.ebook.id, item.quantity - 1)}
                aria-label="Diminuir quantidade"
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                disabled={item.quantity === 1}
              >
                −
              </button>
              <span className="w-8 text-sm text-slate-600 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => setQuantity(item.ebook.id, item.quantity + 1)}
                aria-label="Aumentar quantidade"
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                +
              </button>
              <button
                onClick={() => remove(item.ebook.id)}
                aria-label="Remover item"
                className="ml-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              {formatMoney(item.ebook.priceCents * item.quantity)}
            </span>
          </article>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
        <div>
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-lg font-bold text-slate-900">{formatMoney(totalCents)}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clear}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Limpar carrinho
          </button>
          <button
            onClick={() => setView("checkout")}
            className="rounded-lg bg-kodaros-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}
