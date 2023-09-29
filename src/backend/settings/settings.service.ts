import { Injectable } from "@nestjs/common";
import * as general from "@model/general";
import { Settings } from "@prisma/client";
import { PrismaService } from "@backend/prisma/prisma.service";
import { serializedError } from "@backend/utils/serializedError";
import { ERROR_TYPES } from "@backend/constants/locale";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = this.prisma.settings.findMany({});
    return result;
  }

  async update(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { values } = body as {
      values: Settings[];
    };

    const result = await this.prisma.$transaction(
      values.map((item) =>
        this.prisma.settings.upsert({
          where: {
            key: item.key,
          },
          create: {
            key: item.key,
            value: item.value,
          },
          update: {
            value: item.value,
          },
        })
      )
    );

    if (!result) return serializedError(ERROR_TYPES.SETTINGS_UPDATE_FAILED);

    return result;
  }
}
