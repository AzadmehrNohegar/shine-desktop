import { Injectable } from "@nestjs/common";
import * as general from "@model/general";
import { PrismaService } from "@backend/prisma/prisma.service";

@Injectable()
export class RefundService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { order_id, items, description } = body as {
      order_id: number;
      description: string;
      items: {
        order_item: number;
        quantity: number;
      }[];
    };

    const result = await this.prisma.$transaction([
      this.prisma.refund.create({
        data: {
          order_id,
          description,
          refund_item: {
            create: items.map((item) => ({
              order_item_id: item.order_item,
              order_item_quantity: item.quantity,
            })),
          },
        },
      }),
      this.prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          is_refunded: true,
          status: "refunded",
        },
      }),
    ]);

    return result;
  }

  // findAll() {
  //   return `This action returns all refund`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} refund`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} refund`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} refund`;
  // }
}
