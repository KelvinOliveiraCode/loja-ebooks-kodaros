export type Ebook = {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  priceCents: number;
  cover: string;
  category: string;
  pages: number;
  format: "PDF" | "EPUB";
};

export type CartItem = {
  ebook: Ebook;
  quantity: number;
};

export type CartItems = Record<string, CartItem>;

export type CartAction =
  | { type: "ADD"; ebook: Ebook }
  | { type: "REMOVE"; ebookId: string }
  | { type: "SET_QUANTITY"; ebookId: string; quantity: number }
  | { type: "CLEAR" };

export type View = "catalog" | "cart" | "checkout" | "success";

export type PaymentResult = {
  ok: boolean;
  sessionId?: string;
  error?: string;
};
