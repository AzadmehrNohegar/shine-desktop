import { Injectable } from "@nestjs/common";
import * as general from "src/model/general";
import { PrismaService } from "@backend/prisma/prisma.service";
import { OrderItem } from "@prisma/client";

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { order_id, barcode, product_id } = body as {
      order_id: number;
      barcode?: string;
      product_id?: number;
    };
    const product = await this.prisma.product.findFirst({
      where: {
        ...(barcode
          ? {
              barcode: {
                code: barcode,
              },
            }
          : {}),
        ...(product_id ? { id: product_id } : {}),
      },
      include: {
        price: true,
      },
    });
    if (!product) return null;

    if (order_id) {
      const order_item = await this.prisma.orderItem.findFirst({
        where: {
          order_id,
          product_id: product.id,
        },
      });

      if (!order_item) {
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
            product_id: product.id,
            discount_price: 1000,
            label_price: product.price?.base_price || 0,
            sell_price:
              (product.price?.base_price || 0) -
              (product.price?.base_discount || 0),
            quantity: 1,
          },
        });
      }

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
        product_id: product.id,
        discount_price: 1000,
        label_price: product.price?.base_price || 0,
        sell_price:
          (product.price?.base_price || 0) -
          (product.price?.base_discount || 0),
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
