import type { View } from "../types";
import { useCart } from "../contexts/CartContext";

type NavbarProps = {
  view: View;
  setView: (view: View) => void;
};

export function Navbar({ view, setView }: NavbarProps) {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <span className="font-bold text-kodaros-accent">KODAROS</span>
          <span className="text-sm text-slate-500">Loja de E-books</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setView("catalog")}
            className={`border-b-2 px-2 ${view === "catalog" ? "border-kodaros-accent text-kodaros-accent" : "border-transparent text-slate-600 hover:text-slate-900"}`}
          >
            Catálogo
          </button>
          <button
            onClick={() => setView("cart")}
            className={`border-b-2 px-2 ${view === "cart" ? "border-kodaros-accent text-kodaros-accent" : "border-transparent text-slate-600 hover:text-slate-900"}`}
          >
            Carrinho ({itemCount})
          </button>
        </nav>
        <a
          href="#"
          className="rounded-lg bg-kodaros-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600 transition"
          aria-label="Carrinho"
        >
          Carrinho ({itemCount})
        </a>
      </div>
    </header>
  );
}
