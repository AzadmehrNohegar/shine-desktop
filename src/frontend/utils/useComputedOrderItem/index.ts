import { OrderItem } from "@prisma/client";
import { useMemo } from "react";

export const useComputedOrderItem = (order_items?: OrderItem[]) => {
  const total_price = useMemo(() => {
    if (order_items)
      return order_items
        .map((item) => {
          const { label_price, quantity } = item as {
            label_price: number;
            quantity: number;
          };
          return label_price * quantity;
        })
        .reduce((prev: number, curr: number) => prev + curr, 0);
    return null;
  }, [order_items]);

  const total_dicsount = useMemo(() => {
    if (order_items)
      return order_items
        .map((item) => {
          const { discount_price, quantity } = item as {
            discount_price: number;
            quantity: number;
          };
          return discount_price * quantity;
        })
        .reduce((prev: number, curr: number) => prev + curr, 0);
    return null;
  }, [order_items]);

  const total_count = useMemo(() => {
    if (order_items)
      return order_items
        .map((item) => {
          const { quantity } = item as {
            quantity: number;
          };
          return quantity;
        })
        .reduce((prev: number, curr: number) => prev + curr, 0);
    return null;
  }, [order_items]);
  return { total_count, total_dicsount, total_price };
};
