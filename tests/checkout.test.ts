import { describe, it, expect } from "vitest";
import { stripe } from "../src/lib/stripe";
import { books } from "../src/lib/books";

const lineItems = books.slice(0, 2).map((book) => ({
  priceCents: book.priceCents,
  quantity: 1,
}));

describe("checkout (Stripe simulado)", () => {
  it("cria sessão de checkout com id e url para carrinho válido", async () => {
    const session = await stripe.checkout.sessions.create({
      lineItems,
      customerEmail: "cliente@exemplo.com",
    });

    expect(session.id).toMatch(/^cs_sim_/);
    expect(session.url).toContain(session.id);
  });

  it("lança erro ao criar sessão com carrinho vazio", async () => {
    await expect(
      stripe.checkout.sessions.create({
        lineItems: [],
        customerEmail: "cliente@exemplo.com",
      })
    ).rejects.toThrow(/carrinho vazio/i);
  });

  it("lança erro ao criar sessão com e-mail inválido", async () => {
    await expect(
      stripe.checkout.sessions.create({
        lineItems,
        customerEmail: "nao-e-valido",
      })
    ).rejects.toThrow(/inválido/i);
  });

  it("aprova pagamento com e-mail válido e valor positivo", async () => {
    const result = await stripe.payments.simulate({
      email: "cliente@exemplo.com",
      amountCents: 10980,
    });

    expect(result.ok).toBe(true);
    expect(result.sessionId).toMatch(/^sess_sim_/);
  });

  it("recusa pagamento quando e-mail contém 'fail' (simulação de recusa do banco)", async () => {
    const result = await stripe.payments.simulate({
      email: "cliente-fail@exemplo.com",
      amountCents: 10980,
    });

    expect(result.ok).toBe(false);
    expect(result.error).toContain("recusado");
  });

  it("recusa pagamento com e-mail inválido", async () => {
    const result = await stripe.payments.simulate({
      email: "sem-arroba",
      amountCents: 10980,
    });

    expect(result.ok).toBe(false);
    expect(result.error).toContain("inválido");
  });

  it("recusa pagamento com valor zerado ou negativo", async () => {
    const zero = await stripe.payments.simulate({
      email: "cliente@exemplo.com",
      amountCents: 0,
    });
    expect(zero.ok).toBe(false);
    expect(zero.error).toContain("inválido");
  });
});
