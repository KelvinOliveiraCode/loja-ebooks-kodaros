/**
 * Cliente Stripe SIMULADO (mock).
 *
 * Não requer chave de API nem rede. Substitua pela instância real do Stripe
 * (`new Stripe(process.env.STRIPE_SECRET_KEY)`) em produção.
 */
export type StripeSession = { id: string; url: string };
export type StripePaymentResult = { ok: boolean; sessionId?: string; error?: string };

let sessionCounter = 0;
let paymentCounter = 0;

function nextSessionId(): string {
  sessionCounter += 1;
  return `cs_sim_${String(sessionCounter).padStart(3, "0")}`;
}

function nextPaymentId(): string {
  paymentCounter += 1;
  return `sess_sim_${String(paymentCounter).padStart(3, "0")}`;
}

const FAIL_KEYWORD = "fail";

export const stripe = {
  checkout: {
    sessions: {
      create: async (params: {
        lineItems: Array<{ priceCents: number; quantity: number }>;
        customerEmail: string;
      }): Promise<StripeSession> => {
        // Simula latência de rede da API do Stripe.
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!params.customerEmail.includes("@")) {
          throw new Error("E-mail do cliente inválido.");
        }
        if (params.lineItems.length === 0) {
          throw new Error("Carrinho vazio.");
        }
        const id = nextSessionId();
        return { id, url: `https://checkout.stripe.com/simulate/${id}` };
      },
    },
  },
  payments: {
    simulate: async (params: {
      email: string;
      amountCents: number;
    }): Promise<StripePaymentResult> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const email = params.email.trim().toLowerCase();
      if (!email.includes("@")) {
        return { ok: false, error: "E-mail inválido." };
      }
      if (params.amountCents <= 0) {
        return { ok: false, error: "Valor do pedido inválido." };
      }
      if (email.includes(FAIL_KEYWORD)) {
        return {
          ok: false,
          error: "Pagamento recusado pelo banco (simulado). Tente outro e-mail.",
        };
      }
      return { ok: true, sessionId: nextPaymentId() };
    },
  },
};
