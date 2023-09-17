import { PrismaService } from "@backend/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import * as general from "@model/general";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: unknown) {
    console.log(createProductDto);
    return "This action adds a new product";
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
      },
      include: {
        barcode: true,
        price: true,
      },
    });
    return result;
  }

  async findOne(payload: general.IPCRendererRequestConfig) {
    const { id } = payload;
    const result = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        price: true,
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

  update(id: number, updateProductDto: unknown) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
