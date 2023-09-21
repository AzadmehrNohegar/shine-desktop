import { ERROR_TYPES } from "@backend/constants/locale";
import { PosService } from "@backend/pos/pos.service";
import { PrismaService } from "@backend/prisma/prisma.service";
import { PersianConvert } from "@backend/utils/persianConvert";
import { serializedError } from "@backend/utils/serializedError";
import { Injectable } from "@nestjs/common";
import * as general from "src/model/general";

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pos: PosService
  ) {}

  async create(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { order_id, cash_amount, user_phone, pos_id } = body as {
      order_id: number;
      cash_amount: number | null;
      user_phone: string | null;
      pos_id: number;
    };

    const order = await this.prisma.order.findUnique({
      where: {
        id: order_id,
      },
      include: {
        order_items: true,
      },
    });

    if (!order) return serializedError(ERROR_TYPES.ORDER_NOT_FOUND);

    const order_total = order?.order_items
      .map((item) => item.sell_price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);

    const pos_amount = order_total - (cash_amount || 0);

    if (pos_amount > 1 && pos_amount < 10000)
      return serializedError(ERROR_TYPES.LESS_THAN_MIN);

    if (pos_amount > 10000) {
      const posResponse = await this.pos.createPosTransaction({
        ServiceCode: "1",
        Amount: pos_amount,
        PayerId: "108",
        PcID: "1234",
        PosId: pos_id,
      });

      if (!posResponse) return serializedError(ERROR_TYPES.NO_POS_RESPONSE);

      if (posResponse.status_code === 100)
        await this.prisma.order.update({
          where: {
            id: order_id,
          },
          data: {
            user_phone: PersianConvert.convertPersian2English(user_phone),
            status: "completed",
          },
        });

      const result = await this.prisma.payment.create({
        data: {
          amount: order_total,
          order_id,
          pos_transaction_id: posResponse.id,
          is_resolved: posResponse.status_code === 100,
        },
        include: {
          pos_transaction: true,
        },
      });
      return result;
    }

    await this.prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        user_phone: PersianConvert.convertPersian2English(user_phone),
        status: "completed",
      },
    });

    const result = await this.prisma.payment.create({
      data: {
        amount: order_total,
        order_id,
        is_resolved: true,
      },
    });

    return result;
  }

  // findAll() {
  //   return `This action returns all payment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} payment`;
  // }

  // update(id: number, updatePaymentDto: unknown) {
  //   console.log(updatePaymentDto);
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
