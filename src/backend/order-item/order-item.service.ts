import { Injectable } from "@nestjs/common";
import * as general from "src/model/general";
import { PrismaService } from "@backend/prisma/prisma.service";
import { OrderItem } from "@prisma/client";
// import { wss } from "..";

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { price_id, order_id } = body as {
      order_id: number | null;
      price_id: number;
    };

    const price = await this.prisma.price.findUnique({
      where: {
        id: price_id,
      },
      include: {
        product: true,
      },
    });

    if (!price) return null;

    if (order_id) {
      const order_item = await this.prisma.orderItem.findFirst({
        where: {
          order_id,
          product_id: price.product_id,
          label_price: price.base_price,
        },
      });
      if (!order_item)
        return await this.prisma.orderItem.create({
          include: {
            order: true,
            product: {
              include: {
                barcode: true,
                price: true,
              },
            },
          },
          data: {
            order_id,
            product_id: price.product_id,
            discount_price: price.base_discount,
            label_price: price.base_price,
            sell_price: price.base_price - price.base_discount,
            quantity: 1,
          },
        });
      return await this.prisma.orderItem.update({
        where: {
          id: order_item.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    }

    const order = await this.prisma.order.create({
      select: {
        id: true,
        order_items: true,
      },
    });

    const result = await this.prisma.orderItem.create({
      include: {
        order: true,
        product: {
          include: {
            barcode: true,
            price: true,
          },
        },
      },
      data: {
        order_id: order.id,
        product_id: price.product_id,
        discount_price: price.base_discount,
        label_price: price.base_price,
        sell_price: price.base_price - price.base_discount,
        quantity: 1,
      },
    });
    return result;
  }

  async update(payload: general.IPCRendererRequestConfig) {
    const { id, body } = payload;
    const { quantity, label_price } = body as OrderItem;
    if (quantity === 0 || isNaN(quantity)) {
      return await this.prisma.orderItem.delete({
        where: {
          id: +id!,
        },
      });
    }
    return await this.prisma.orderItem.update({
      where: {
        id: +id!,
      },
      data: {
        ...(quantity ? { quantity } : {}),
        ...(label_price ? { label_price } : {}),
      },
    });
  }

  async remove(id: number) {
    const result = await this.prisma.orderItem.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
