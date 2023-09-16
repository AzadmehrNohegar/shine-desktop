import { OrderItem } from "@prisma/client";
import { useMemo } from "react";

export const useCompoutedOrderItem = (order_items: OrderItem[]) => {
  const total_price = useMemo(
    () =>
      order_items
        .map((item) => {
          const { label_price, quantity } = item as {
            label_price: number;
            quantity: number;
          };
          return label_price * quantity;
        })
        .reduce((prev: number, curr: number) => prev + curr, 0),
    [order_items]
  );

  const total_dicsount = useMemo(
    () =>
      order_items
        .map((item) => {
          const { discount_price, quantity } = item as {
            discount_price: number;
            quantity: number;
          };
          return discount_price * quantity;
        })
        .reduce((prev: number, curr: number) => prev + curr, 0),
    [order_items]
  );

  const total_count = useMemo(
    () =>
      order_items
        .map((item) => {
          const { quantity } = item as {
            quantity: number;
          };
          return quantity;
        })
        .reduce((prev: number, curr: number) => prev + curr, 0),
    [order_items]
  );
  return { total_count, total_dicsount, total_price };
};
