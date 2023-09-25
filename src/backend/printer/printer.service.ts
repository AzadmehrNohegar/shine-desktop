import { Injectable } from "@nestjs/common";
import { Order, OrderItem, Product } from "@prisma/client";
import { wss } from "..";
import { orderTools } from "@backend/utils/orderTools";

type compositeOrderItem = OrderItem & {
  product: Product;
};

@Injectable()
export class PrinterService {
  async printOrder(result: unknown) {
    const { id, order_items, created_date } = result as Order & {
      order_items: compositeOrderItem[];
    };
    const { discount_total, raw_total } = orderTools(result);

    wss.clients.forEach(function each(client) {
      const json = {
        vendor_name: "غرفه پیروزی",
        vendor_address: "میدان میوه و تره بار پیروزی",
        date: new Intl.DateTimeFormat("fa-IR", {
          month: "long",
          day: "numeric",
          year: "numeric",
          numberingSystem: "latn",
        }).format(new Date(created_date)),
        time: new Intl.DateTimeFormat("fa-IR", {
          timeStyle: "short",
          numberingSystem: "latn",
        }).format(new Date(created_date)),
        number: id,
        total_discount: discount_total,
        total_amount: raw_total,
        total_payable_amount: raw_total - discount_total,
        order_items: order_items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          discount: item.discount_price * item.quantity,
          total_amount: item.quantity * item.sell_price,
          unit_price: item.label_price,
        })),
      };
      client.send(JSON.stringify(json));
    });
  }
}
