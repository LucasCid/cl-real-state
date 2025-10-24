export function formatPrice(price: number) {
  return Number(price).toLocaleString("cl-CL", {
    style: "currency",
    currency: "CLP",
  });
}
