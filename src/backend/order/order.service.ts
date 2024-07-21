import { cloneable } from "@backend/utils/deepClone";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@backend/prisma/prisma.service";
import * as general from "@model/general";
import { serializedError } from "@backend/utils/serializedError";
import { ERROR_TYPES } from "@backend/constants/locale";
import { PrinterService } from "@backend/printer/printer.service";
import { Workbook } from "exceljs";
import { orderTools } from "@backend/utils/orderTools";

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printer: PrinterService
  ) {}

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
    const result = await this.prisma.order.create({
      data: {},
    });
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
          orderBy: {
            id: "desc",
          },
          select: {
            id: true,
            discount_price: true,
            discount_total: true,
            label_price: true,
            product: {
              include: {
                barcode: true,
              },
            },
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
          ...(id && !isNaN(id)
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
          ...(id && !isNaN(id)
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
        orderBy: {
          id: "desc",
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
          orderBy: {
            id: "desc",
          },
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

  async remove(payload: general.IPCRendererRequestConfig) {
    const { id } = payload;
    const result = await this.prisma.order.delete({
      where: {
        id,
      },
    });
    return result;
  }

  async invoice(payload: general.IPCRendererRequestConfig) {
    const { id } = payload;
    const order = await this.prismaExtended.order.findUnique({
      where: {
        id,
      },
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!order) return serializedError(ERROR_TYPES.ORDER_NOT_FOUND);
    await this.printer.printOrder(order);
    return "success";
  }

  async excel() {
    const result = await this.prismaExtended.order.findMany({
      where: {
        status: {
          not: {
            equals: "temp",
          },
        },
      },
      include: {
        order_items: {
          orderBy: {
            id: "desc",
          },
          select: {
            id: true,
            discount_price: true,
            discount_total: true,
            label_price: true,
            quantity: true,
            sell_price: true,
            sub_total: true,
            order_id: true,
            product_id: true,
          },
        },
      },
    });

    if (result.length === 0) return serializedError(ERROR_TYPES.NO_ORDERS);

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("output");
    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "STATUS", key: "status" },
      { header: "USER PHONE", key: "user_phone" },
      { header: "IS REFUNDED", key: "is_refunded" },
      { header: "CREATED DATE", key: "created_date" },
      { header: "TOTAL COUNT", key: "total_count" },
      { header: "TOTAL DISCOUNT", key: "total_dicsount" },
      { header: "TOTAL PRICE", key: "total_price" },
    ];
    result.forEach((order) => {
      const { discount_total, order_total, total_count } = orderTools(order);
      worksheet.addRow({
        id: order.id,
        status: order.status,
        user_phone: order.user_phone,
        is_refunded: order.is_refunded,
        created_date: order.created_date,
        total_count: total_count,
        total_dicsount: discount_total,
        total_price: order_total,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
  }
}
