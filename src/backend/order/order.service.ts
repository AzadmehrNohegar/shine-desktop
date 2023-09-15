import { Injectable } from "@nestjs/common";
import { PrismaService } from "@backend/prisma/prisma.service";
import { deepClone } from "@backend/utils/deepClone";
import * as general from "src/types/general";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    const result = await this.prisma.order.create({
      data: {
        payable_price: 0,
        total_discount: 0,
        total_price: 0,
      },
    });
    return result;
  }

  async findAll(payload: general.IPCRendererRequestConfig) {
    const { params } = payload;
    const result = await this.prisma
      .$extends({
        result: {
          orderItem: {
            sub_total: {
              needs: {
                quantity: true,
                label_price: true,
                discount_price: true,
              },
              compute(orderItem) {
                return (
                  orderItem.quantity *
                  (orderItem.label_price - orderItem.discount_price)
                );
              },
            },
            discount_total: {
              needs: { quantity: true, discount_price: true },
              compute(orderItem) {
                return orderItem.quantity * orderItem.discount_price;
              },
            },
          },
        },
      })
      .order.findMany({
        where: {
          status: params?.status,
        },

        include: {
          order_items: {
            select: {
              id: true,
              discount_price: true,
              discount_total: true,
              label_price: true,
              order: true,
              product: true,
              quantity: true,
              sell_price: true,
              sub_total: true,
            },
          },
        },
      });

    return deepClone(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: unknown) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const result = await this.prisma.order.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
