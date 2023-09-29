import { PrismaService } from "@backend/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import * as general from "@model/general";
import { cloneable } from "@backend/utils/deepClone";
import { Barcode, Price, Product } from "@prisma/client";
import { serializedError } from "@backend/utils/serializedError";
import { ERROR_TYPES } from "@backend/constants/locale";
import { PersianConvert } from "@backend/utils/persianConvert";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { name, internal_code, price, barcode } = body as Product & {
      price: Pick<
        Price,
        "inventory" | "base_discount_percentage" | "base_price"
      >[];
      barcode: Pick<Barcode, "code">[];
    };

    if (price.length === 0) return serializedError(ERROR_TYPES.PRICE_NEEDED);

    const result = await this.prisma.product.create({
      data: {
        internal_code: Number(internal_code),
        name,
        price: {
          create: price.map((item) => ({
            inventory: item.inventory,
            base_price: item.base_price,
            base_discount_percentage: item.base_discount_percentage,
          })),
        },
        barcode: {
          create: barcode.map((item) => ({
            code: item.code,
          })),
        },
      },
    });

    return result;
  }

  async findAll(payload: general.IPCRendererRequestConfig) {
    const { params } = payload;
    const { search } = params as { search: string };
    const result = await this.prisma.product.findMany({
      take: 10,
      where: {
        name: {
          contains: search,
        },
        is_active: true,
      },
      include: {
        barcode: true,
        price: true,
      },
    });
    return result;
  }

  async findAllPaginated(payload: general.IPCRendererRequestConfig) {
    const { params } = payload;
    const { page, page_size, search } = params as {
      page: number;
      page_size: number;
      search: string;
    };
    const [count, items] = await this.prisma.$transaction([
      this.prisma.product.count({
        where: {
          OR: [
            {
              barcode: {
                some: {
                  code: {
                    contains: search,
                  },
                },
              },
            },
            {
              name: {
                contains: search,
              },
            },
          ],
        },
      }),
      this.prisma.product.findMany({
        take: page_size,
        skip: (page - 1) * page_size,
        where: {
          OR: [
            {
              barcode: {
                some: {
                  code: {
                    contains: search,
                  },
                },
              },
            },
            {
              name: {
                contains: search,
              },
            },
          ],
        },
        include: {
          barcode: true,
          price: true,
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
    const result = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        price: true,
        barcode: true,
      },
    });
    return result;
  }

  async findOneByBarcode(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { barcode } = body as { barcode: string };
    const result = await this.prisma.product.findFirst({
      where: {
        barcode: {
          some: {
            code: barcode,
          },
        },
      },
      include: {
        price: true,
      },
    });
    return result;
  }

  async update(payload: general.IPCRendererRequestConfig) {
    const { id, body } = payload as {
      id: number;
      body: Pick<Product, "name"> & {
        price: Pick<
          Price,
          "base_discount_percentage" | "base_price" | "inventory"
        >[];
        barcode: Pick<Barcode, "code">[];
      };
    };

    const result = await this.prisma.product.update({
      where: {
        id,
      },
      include: {
        price: true,
        barcode: true,
      },
      data: {
        name: body.name,
        barcode: {
          deleteMany: {
            code: {
              notIn: body.barcode.map((item) => item.code),
            },
          },
          connectOrCreate: body.barcode.map((item) => ({
            where: {
              code: item.code,
            },
            create: {
              code: item.code,
            },
          })),
        },
        price: {
          deleteMany: {
            base_price: {
              notIn: body.price.map((item) => item.base_price),
            },
          },
          updateMany: body.price.map((item) => ({
            where: {
              base_price: item.base_price,
            },
            data: {
              base_price: item.base_price,
              base_discount_percentage: item.base_discount_percentage,
              inventory: item.inventory,
            },
          })),
          connectOrCreate: body.price.map((item) => ({
            create: {
              inventory: item.inventory,
              base_discount_percentage: item.base_discount_percentage,
              base_price: item.base_price,
            },
            where: {
              product_id_base_price: {
                base_price: item.base_price,
                product_id: id,
              },
            },
          })),
        },
      },
    });

    return result;
  }

  async updateProductActivation(payload: general.IPCRendererRequestConfig) {
    const { id, body } = payload as {
      id: number;
      body: Product & {
        price: Price[];
        barcode: Barcode[];
      };
    };

    const { is_active } = body;

    const result = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        is_active,
      },
    });

    return result;
  }

  async uploadCSV(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;
    const { values } = body as {
      values: string[];
    };

    const subArrays = [];

    if (values.length % 6 !== 0)
      return serializedError(ERROR_TYPES.INVALID_FILE);
    for (let index = 0; index < values.length; index += 6) {
      const subArray = values.slice(index, index + 6);
      subArrays.push(subArray);
    }

    try {
      const result = await this.prisma.$transaction(
        subArrays.map((item) => {
          const [
            name,
            internal_code,
            barcode,
            base_discount_percentage,
            inventory,
            base_price,
          ] = item;

          return this.prisma.product.upsert({
            where: {
              internal_code: Number(internal_code),
            },
            update: {
              name: name,
              price: {
                create: {
                  inventory: Number(
                    PersianConvert.convertPersian2English(inventory)
                  ),
                  base_price: Number(
                    PersianConvert.convertPersian2English(base_price)
                  ),
                  base_discount_percentage: Number(
                    PersianConvert.convertPersian2English(
                      base_discount_percentage
                    )
                  ),
                },
              },
              barcode: {
                create: {
                  code: PersianConvert.convertPersian2English(barcode)!,
                },
              },
            },
            create: {
              name: name,
              internal_code: Number(internal_code),
              price: {
                create: {
                  inventory: Number(
                    PersianConvert.convertPersian2English(inventory)
                  ),
                  base_price: Number(
                    PersianConvert.convertPersian2English(base_price)
                  ),
                  base_discount_percentage: Number(
                    PersianConvert.convertPersian2English(
                      base_discount_percentage
                    )
                  ),
                },
              },
              barcode: {
                create: {
                  code: PersianConvert.convertPersian2English(barcode)!,
                },
              },
            },
          });
        })
      );

      return result;
    } catch (e) {
      return serializedError(ERROR_TYPES.INVALID_FILE_CONTENT);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
