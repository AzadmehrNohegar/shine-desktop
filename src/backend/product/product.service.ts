import { PrismaService } from "@backend/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import * as general from "src/types/general";

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
      where: {
        name: {
          contains: search,
        },
      },
      include: {
        barcode: true,
      },
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: unknown) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
