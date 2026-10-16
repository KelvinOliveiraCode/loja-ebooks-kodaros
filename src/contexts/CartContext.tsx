import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItems, Ebook } from "../types";
import { cartReducer, cartSelectors } from "../lib/cart";

type CartContextValue = {
  items: ReturnType<typeof cartSelectors>["items"];
  add: (ebook: Ebook) => void;
  remove: (ebookId: string) => void;
  setQuantity: (ebookId: string, quantity: number) => void;
  clear: () => void;
  totalCents: number;
  itemCount: number;
  isEmpty: boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, {} as CartItems);

  const add = useCallback((ebook: Ebook) => {
    dispatch({ type: "ADD", ebook });
  }, []);

  const remove = useCallback((ebookId: string) => {
    dispatch({ type: "REMOVE", ebookId });
  }, []);

  const setQuantity = useCallback((ebookId: string, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", ebookId, quantity });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const { items: itemList, totalCents, itemCount, isEmpty } = useMemo(
    () => cartSelectors(items),
    [items]
  );

  const value: CartContextValue = useMemo(
    () => ({
      items: itemList,
      add,
      remove,
      setQuantity,
      clear,
      totalCents,
      itemCount,
      isEmpty,
    }),
    [itemList, totalCents, itemCount, isEmpty, add, remove, setQuantity, clear]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de um CartProvider.");
  }
  return ctx;
}
