import type { Ebook } from "../types";

export const books: Ebook[] = [
  {
    id: "ebook-1",
    slug: "typescript-na-pratica",
    title: "TypeScript na Prática",
    author: "Kelvin Oliveira",
    description:
      "Do básico aos tipos avançados: tipos, genéricos, utilitários e padrões reais em projetos React e Node.",
    priceCents: 4990,
    cover: "📘",
    category: "Frontend",
    pages: 180,
    format: "PDF",
  },
  {
    id: "ebook-2",
    slug: "react-18-componentes-modernos",
    title: "React 18: Componentes Modernos",
    author: "Kelvin Oliveira",
    description:
      "Hooks, Concurrent Features, Suspense e boas práticas de componente para interfaces escaláveis.",
    priceCents: 5990,
    cover: "⚛️",
    category: "Frontend",
    pages: 210,
    format: "EPUB",
  },
  {
    id: "ebook-3",
    slug: "tailwind-css-zero-a-producao",
    title: "Tailwind CSS do Zero à Produção",
    author: "Kelvin Oliveira",
    description:
      "Utilitários, design responsivo, temas customizados e componentes prontos para implantar hoje.",
    priceCents: 4490,
    cover: "🎨",
    category: "CSS",
    pages: 160,
    format: "PDF",
  },
  {
    id: "ebook-4",
    slug: "vitest-tdd-javascript",
    title: "Vitest e TDD em JavaScript",
    author: "Kelvin Oliveira",
    description:
      "Red-Green-Refactor na prática: testes unitários, mocks e cobertura com Vitest.",
    priceCents: 3990,
    cover: "🧪",
    category: "Testes",
    pages: 140,
    format: "PDF",
  },
  {
    id: "ebook-5",
    slug: "stripe-checkout-na-pratica",
    title: "Stripe Checkout na Prática",
    author: "Kelvin Oliveira",
    description:
      "Integração de pagamentos com Stripe: sessões de checkout, webhooks e ambiente simulado.",
    priceCents: 5490,
    cover: "💳",
    category: "Pagamentos",
    pages: 120,
    format: "EPUB",
  },
  {
    id: "ebook-6",
    slug: "arquitetura-frontend-enxuta",
    title: "Arquitetura Frontend Enxuta",
    author: "Kelvin Oliveira",
    description:
      "Camadas, desacoplamento e decisões de design que evitam reescritas caras no frontend.",
    priceCents: 6990,
    cover: "🏗️",
    category: "Arquitetura",
    pages: 240,
    format: "PDF",
  },
];

export function findBookById(id: string): Ebook | undefined {
  return books.find((book) => book.id === id);
}
