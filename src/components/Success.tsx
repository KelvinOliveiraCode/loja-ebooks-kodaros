import type { View } from "../types";

type SuccessProps = { setView: (view: View) => void };

export function Success({ setView }: SuccessProps) {
  return (
    <section className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="mx-auto mb-4 rounded-full bg-green-100 p-4 text-green-600">
        ✅
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Compra concluída!</h2>
      <p className="text-slate-600 mb-8">
        Obrigado pela compra na KODAROS. Seus e-books estão disponíveis para
        download (ambiente simulado do Stripe).
      </p>
      <button
        onClick={() => setView("catalog")}
        className="rounded-lg bg-kodaros-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition"
      >
        Voltar ao catálogo
      </button>
    </section>
  );
}
