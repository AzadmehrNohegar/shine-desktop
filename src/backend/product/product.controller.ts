import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { ProductService } from "./product.service";
import { IpcHandle } from "@doubleshot/nest-electron";
import * as general from "@model/general";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @IpcHandle("createProduct")
  create(@Payload() createProductDto: unknown) {
    return this.productService.create(createProductDto);
  }

  @IpcHandle("findAllProduct")
  findAll(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.findAll(payload);
  }

  @IpcHandle("findOneProduct")
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @IpcHandle("updateProduct")
  update(@Payload() updateProductDto: unknown) {
    return this.productService.update(2, updateProductDto);
  }

  @IpcHandle("removeProduct")
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }
}
