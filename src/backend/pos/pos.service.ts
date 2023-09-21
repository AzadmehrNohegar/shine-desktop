import { ApiService } from "@backend/api/api.service";
import { PrismaService } from "@backend/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PosTransaction } from "@prisma/client";
import * as general from "src/model/general";

@Injectable()
export class PosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly api: ApiService
  ) {}

  async createPosTransaction(
    payload: general.posBody
  ): Promise<PosTransaction | null> {
    const { Amount, PayerId, PcID, PosId, ServiceCode } = payload;

    const pos = await this.prisma.pos.findUnique({
      where: {
        id: PosId,
      },
    });

    //TODO: ADD ERROR LATER
    if (!pos) return null;

    const posRequest = await this.api.postPos({
      body: {
        Url: `http://${pos.ip}:${pos.port}/bpmpospc/service`,
        Amount,
        PayerId,
        PcID,
        PosId,
        ServiceCode,
      },
    });

    //TODO: ADD ERROR LATER
    if (!posRequest) return null;

    const result = await this.prisma.posTransaction.create({
      data: {
        amount: Amount,
        pos_id: PosId,
        pan: "125125",
        terminal_number: "125125",
        status_code: 100,
      },
    });
    return result;
  }

  async findAllPos() {
    const result = await this.prisma.pos.findMany();
    return result;
  }
}
