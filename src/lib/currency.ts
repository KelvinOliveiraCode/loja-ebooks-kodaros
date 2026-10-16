const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export function formatMoney(cents: number): string {
  return formatter.format(cents / 100);
}
