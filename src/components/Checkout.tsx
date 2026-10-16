import { useState } from "react";
import type { View } from "../types";
import { formatMoney } from "../lib/currency";
import { useCart } from "../contexts/CartContext";
import { stripe } from "../lib/stripe";

type CheckoutProps = { setView: (view: View) => void };

export function Checkout({ setView }: CheckoutProps) {
  const { items, totalCents, clear } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      await stripe.checkout.sessions.create({
        lineItems: items.map((item) => ({
          priceCents: item.ebook.priceCents,
          quantity: item.quantity,
        })),
        customerEmail: email,
      });

      const result = await stripe.payments.simulate({
        email,
        amountCents: totalCents,
      });

      if (!result.ok) {
        setStatus("fail");
        setMessage(result.error ?? "Falha no pagamento.");
        return;
      }

      setStatus("ok");
      clear();
    } catch (error) {
      setStatus("fail");
      setMessage(
        error instanceof Error
          ? error.message
          : "Erro inesperado no checkout (simulado)."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h2>

      {status === "ok" && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-800">
          Pedido confirmado! E-books liberados para download (ambiente simulado).
        </div>
      )}
      {status === "fail" && message && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Nome completo
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-kodaros-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-kodaros-accent"
          />
          <p className="text-xs text-slate-400 mt-1">
            Use um e-mail contendo "fail" para simular recusa (mock do Stripe).
          </p>
        </div>
        <div>
          <label htmlFor="card" className="block text-sm font-medium text-slate-700 mb-1">
            Cartão (simulado)
          </label>
          <input
            id="card"
            placeholder="4242 4242 4242 4242"
            disabled
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400"
          />
          <p className="text-xs text-slate-400 mt-1">
            Não há cobrança real: este checkout é um mock do Stripe.
          </p>
        </div>
        <div className="flex items-end gap-3 pt-2">
          <span className="text-sm font-semibold text-slate-900">
            Total: {formatMoney(totalCents)}
          </span>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-kodaros-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50 transition"
          >
            {loading ? "Processando…" : "Pagar e concluir"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <button
          onClick={() => setView("cart")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <span aria-hidden="true">‹</span> Voltar ao carrinho
        </button>
      </div>
    </section>
  );
}
