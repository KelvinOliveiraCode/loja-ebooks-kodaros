import { describe, it, expect } from "vitest";
import { cartReducer, cartSelectors } from "../src/lib/cart";
import { books } from "../src/lib/books";

const typescript = books[0];
const react = books[1];

describe("carrinho (cartReducer)", () => {
  it("adiciona um item ao carrinho vazio", () => {
    const result = cartReducer({}, { type: "ADD", ebook: typescript });

    expect(Object.keys(result)).toHaveLength(1);
    expect(result[typescript.id]).toEqual({ ebook: typescript, quantity: 1 });
    expect(cartSelectors(result).totalCents).toBe(typescript.priceCents);
  });

  it("aumenta a quantidade ao adicionar o mesmo e-book novamente", () => {
    let items = cartReducer({}, { type: "ADD", ebook: typescript });
    items = cartReducer(items, { type: "ADD", ebook: typescript });

    expect(resultQuantity(items, typescript.id)).toBe(2);
    expect(cartSelectors(items).totalCents).toBe(
      typescript.priceCents * 2
    );
  });

  it("remove um item pelo id", () => {
    let items = cartReducer({}, { type: "ADD", ebook: typescript });
    items = cartReducer(items, { type: "ADD", ebook: react });
    items = cartReducer(items, { type: "REMOVE", ebookId: typescript.id });

    expect(Object.keys(items)).toEqual([react.id]);
    expect(cartSelectors(items).itemCount).toBe(1);
  });

  it("define quantidade e remove quando zerada", () => {
    let items = cartReducer({}, { type: "ADD", ebook: typescript });
    items = cartReducer(items, { type: "SET_QUANTITY", ebookId: typescript.id, quantity: 5 });

    expect(resultQuantity(items, typescript.id)).toBe(5);

    items = cartReducer(items, { type: "SET_QUANTITY", ebookId: typescript.id, quantity: 0 });
    expect(Object.keys(items)).toHaveLength(0);
  });

  it("limpa o carrinho inteiro", () => {
    let items = cartReducer({}, { type: "ADD", ebook: typescript });
    items = cartReducer(items, { type: "ADD", ebook: react });
    items = cartReducer(items, { type: "CLEAR" });

    expect(items).toEqual({});
    expect(cartSelectors(items).isEmpty).toBe(true);
    expect(cartSelectors(items).totalCents).toBe(0);
  });

  it("contagem de itens soma quantidades de todos os produtos", () => {
    const items = cartReducer(
      cartReducer({}, { type: "ADD", ebook: typescript }),
      { type: "ADD", ebook: react }
    );
    const withTwoTypescripts = cartReducer(items, {
      type: "ADD",
      ebook: typescript,
    });

    expect(cartSelectors(withTwoTypescripts).itemCount).toBe(3);
  });
});

function resultQuantity(items: Record<string, { quantity: number }>, id: string): number {
  return items[id]?.quantity ?? 0;
}
