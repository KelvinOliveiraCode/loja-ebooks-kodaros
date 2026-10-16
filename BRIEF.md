# BRIEF — loja-ebooks-kodaros

Projeto: loja de e-books KODAROS (área Frontend)
Diretório de saída: C:\Users\Kelvin\AppData\Local\Temp\opencode\github-staging\projects\loja-ebooks-kodaros\

## Entregas

| Arquivo | Conteúdo |
|---------|----------|
| package.json | Scripts dev/build/test/lint; dependências React 18, TS, Tailwind, Vite, Vitest |
| tsconfig.json, vite.config.ts, tailwind.config.js, postcss.config.js, index.html | Configuração do projeto |
| src/main.tsx, src/App.tsx, src/index.css | Entry point, roteador simples de views, estilos base |
| src/types/index.ts | Tipos: Ebook, CartItem, CartItems, CartAction, View, PaymentResult |
| src/lib/books.ts | Catálogo de 6 e-books + findBookById |
| src/lib/cart.ts | cartReducer (ADD/REMOVE/SET_QUANTITY/CLEAR) + cartSelectors |
| src/lib/currency.ts | formatMoney (BRL, pt-BR) |
| src/lib/stripe.ts | Stripe simulado: sessions.create + payments.simulate |
| src/contexts/CartContext.tsx | CartProvider / useCart com useReducer |
| src/components/{BookCard,Catalog,Cart,Checkout,Navbar,Success}.tsx | Interface: catálogo, carrinho, checkout, navegação |
| tests/cart.test.ts | 6 testes do carrinho |
| tests/checkout.test.ts | 7 testes do checkout simulado |
| vitest.config.ts | Config Vitest (ambiente node) |
| README.md | Documentação bilíngue PT-BR + EN |
| BRIEF.md | Este arquivo |

## Critérios de aceitação (do PLANO_50_PROJETOS.md)

- Compra simulada funciona: catálogo → carrinho → checkout com Stripe simulado → confirmação. Verificado com testes.
- Testes que passam: 13/13 (2 arquivos).
- README PT-BR + EN completo: título, descrição, como usar, testes, licença MIT, autor Kelvin Oliveira.

## Comando de teste usado

`npm test` (Vitest v2.1.9, ambiente node)

## Resultado dos testes

- `npm run build`: `tsc --noEmit` + `vite build` — passou (sem erros de tipo, build gerado em `dist/`).
- `npm test`: Test Files 2 passed (2), Tests 13 passed (13). Todos verdes.

## Como verificar

1. `cd C:\Users\Kelvin\AppData\Local\Temp\opencode\github-staging\projects\loja-ebooks-kodaros\`
2. `npm install`
3. `npm run dev` → abre http://localhost:5173 (catálogo, carrinho, checkout simulado).
4. `npm run build` → type-check + build de produção.
5. `npm test` → 13 testes passando.

README: ./README.md
BRIEF: ./BRIEF.md

Autor: Kelvin Oliveira
Licença: MIT
