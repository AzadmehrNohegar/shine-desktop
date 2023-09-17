import { cloneable } from "@backend/utils/deepClone";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@backend/prisma/prisma.service";
import * as general from "@model/general";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  private prismaExtended = this.prisma.$extends({
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
  });

  async create() {
    const result = await this.prisma.order.create({});
    return result;
  }

  async findAll(payload: general.IPCRendererRequestConfig) {
    const { params } = payload;
    const { status } = params as { status: general.orderTypes };
    const result = await this.prismaExtended.order.findMany({
      where: {
        ...(status
          ? {
              status: {
                equals: status,
              },
            }
          : {}),
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

    return cloneable.deepCopy(result);
  }

  async findAllPaginated(payload: general.IPCRendererRequestConfig) {
    const { params } = payload;
    const { page, page_size, id, status } = params as {
      page: number;
      page_size: number;
      id: number;
      status: general.orderTypes;
    };
    const [count, items] = await this.prisma.$transaction([
      this.prismaExtended.order.count({
        where: {
          ...(id
            ? {
                id: {
                  equals: id,
                },
              }
            : {}),
          ...(status
            ? {
                status: {
                  equals: status,
                },
              }
            : {}),
        },
      }),
      this.prismaExtended.order.findMany({
        take: page_size,
        skip: (page - 1) * page_size,
        where: {
          ...(id
            ? {
                id: {
                  equals: id,
                },
              }
            : {}),
          ...(status
            ? {
                status: {
                  equals: status,
                },
              }
            : {}),
        },
        include: {
          order_items: true,
        },
      }),
    ]);
    return {
      count,
      results: cloneable.deepCopy(items),
    };
  }

  async findOne(payload: general.IPCRendererRequestConfig) {
    const { id } = payload;
    const result = await this.prismaExtended.order.findUnique({
      where: {
        id,
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
    return cloneable.deepCopy(result);
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
