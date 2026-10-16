import { useState } from "react";
import { CartProvider, useCart } from "./contexts/CartContext";
import { Catalog } from "./components/Catalog";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { Success } from "./components/Success";
import { Navbar } from "./components/Navbar";
import type { View } from "./types";

function Router() {
  const [view, setView] = useState<View>("catalog");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar view={view} setView={setView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {view === "catalog" && <Catalog setView={setView} />}
        {view === "cart" && <Cart setView={setView} />}
        {view === "checkout" && <Checkout setView={setView} />}
        {view === "success" && <Success setView={setView} />}
      </main>
    </div>
  );
}

export default function App() {
  const { itemCount } = useCart();
  return (
    <CartProvider>
      <Router />
      <div className="fixed bottom-4 right-4">
        <span
          className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white shadow-md"
          aria-label="Itens no carrinho"
        >
          {itemCount}
        </span>
      </div>
    </CartProvider>
  );
}
