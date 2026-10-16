import type { CartAction, CartItems } from "../types";

export function cartReducer(items: CartItems, action: CartAction): CartItems {
  switch (action.type) {
    case "ADD": {
      const existing = items[action.ebook.id];
      if (existing) {
        return {
          ...items,
          [action.ebook.id]: {
            ...existing,
            quantity: existing.quantity + 1,
          },
        };
      }
      return { ...items, [action.ebook.id]: { ebook: action.ebook, quantity: 1 } };
    }
    case "REMOVE": {
      const { [action.ebookId]: _removed, ...rest } = items;
      return rest;
    }
    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        const { [action.ebookId]: _removed, ...rest } = items;
        return rest;
      }
      const existing = items[action.ebookId];
      if (!existing) return items;
      return {
        ...items,
        [action.ebookId]: { ...existing, quantity: action.quantity },
      };
    }
    case "CLEAR":
      return {};
    default:
      return items;
  }
}

export function cartSelectors(items: CartItems) {
  const list = Object.values(items);
  return {
    items: list,
    totalCents: list.reduce((sum, it) => sum + it.ebook.priceCents * it.quantity, 0),
    itemCount: list.reduce((sum, it) => sum + it.quantity, 0),
    isEmpty: list.length === 0,
  };
}

export type CartStateFromReducer = ReturnType<typeof cartReducer>;
