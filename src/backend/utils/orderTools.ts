import { Order, OrderItem } from "@prisma/client";

function orderTools(order: unknown) {
  const { order_items } = order as Order & {
    order_items: OrderItem[];
  };

  const raw_total = order_items
    .map((item) => item.label_price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  const discount_total = order_items
    .map((item) => item.discount_price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  const order_total = order_items
    .map((item) => item.sell_price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  return { raw_total, discount_total, order_total };
}

export { orderTools };
