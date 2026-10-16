# Loja de E-books KODAROS

Loja de e-books para desenvolvedores: catálogo, carrinho de compras e checkout simulado com Stripe. Construído com React 18, TypeScript, Tailwind CSS e Vite.

English: KODAROS e-book store — catalog, shopping cart, and a simulated Stripe checkout. Built with React 18, TypeScript, Tailwind CSS, and Vite.

## Stack

- React 18 + TypeScript (strict)
- Vite
- Tailwind CSS
- Vitest (testes / tests)
- Stripe: cliente simulado (mock), sem chave de API nem cobrança real

## Conteúdo do repositório

- `src/lib/books.ts` — catálogo de 6 e-books (título, autor, preço em centavos, páginas, formato).
- `src/lib/cart.ts` — redutor do carrinho (adicionar, remover, alterar quantidade, limpar) e seletores (total, quantidade de itens).
- `src/lib/stripe.ts` — Stripe simulado: cria sessão de checkout e simula pagamento (aprova ou recusa com base no e-mail; e-mails com "fail" são recusados).
- `src/contexts/CartContext.tsx` — estado global do carrinho via `useReducer`.
- `src/components/` — catálogo, card do e-book, carrinho, checkout, navbar, confirmação.
- `tests/` — 13 testes (carrinho e checkout), sem mocks de comportamento.

## Como usar

Instale as dependências:

```
npm install
```

Rode o servidor de desenvolvimento:

```
npm run dev
```

Abra http://localhost:5173.

Verifique tipos e gere a build de produção:

```
npm run build
```

Rode os testes:

```
npm test
```

Resultado esperado: 13 testes passando em 2 arquivos.

## Checkout simulado

O checkout não cobra nada. O mock do Stripe (`src/lib/stripe.ts`):

1. Cria uma sessão de checkout com `id` e `url` determinísticos.
2. Simula o pagamento:
   - e-mail válido e valor positivo → aprovado (`ok: true`);
   - e-mail contendo `fail` → recusado pelo banco (`ok: false`);
   - e-mail sem `@` ou valor zerado → erro de validação.

Em produção, substitua `stripe.ts` pela instância real do Stripe (`new Stripe(process.env.STRIPE_SECRET_KEY)`).

## Testes

Todos os testes usam código real (sem mocks de comportamento) e rodam com Vitest:

```
npm test
```

Saída do último run:

```
Test Files  2 passed (2)
  Tests    13 passed (13)
```

## Licença

MIT

## Autor

Kelvin Oliveira

English below.

---

# KODAROS E-book Store

Developer e-book store: catalog, shopping cart, and a simulated Stripe checkout. Built with React 18, TypeScript, Tailwind CSS, and Vite.

## Stack

- React 18 + TypeScript (strict)
- Vite
- Tailwind CSS
- Vitest (tests)
- Stripe: simulated client (mock), no API key, no real charges

## Repository contents

- `src/lib/books.ts` — catalog of 6 e-books (title, author, price in cents, pages, format).
- `src/lib/cart.ts` — cart reducer (add, remove, change quantity, clear) and selectors (total, item count).
- `src/lib/stripe.ts` — simulated Stripe: creates a checkout session and simulates payment (approves or declines based on email; emails containing "fail" are declined).
- `src/contexts/CartContext.tsx` — global cart state via `useReducer`.
- `src/components/` — catalog, e-book card, cart, checkout, navbar, confirmation screen.
- `tests/` — 13 tests (cart and checkout), no behavioral mocks.

## How to use

Install dependencies:

```
npm install
```

Run the dev server:

```
npm run dev
```

Open http://localhost:5173.

Type-check and build for production:

```
npm run build
```

Run tests:

```
npm test
```

Expected result: 13 tests passing across 2 files.

## Simulated checkout

The checkout charges nothing. The Stripe mock (`src/lib/stripe.ts`):

1. Creates a checkout session with deterministic `id` and `url`.
2. Simulates payment:
   - valid email and positive amount → approved (`ok: true`);
   - email containing `fail` → declined by the bank (`ok: false`);
   - email without `@` or zero amount → validation error.

For production, replace `stripe.ts` with the real Stripe instance (`new Stripe(process.env.STRIPE_SECRET_KEY)`).

## Tests

All tests use real code (no behavioral mocks) and run with Vitest:

```
npm test
```

Last run output:

```
Test Files  2 passed (2)
  Tests    13 passed (13)
```

## License

MIT

## Author

Kelvin Oliveira
