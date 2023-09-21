import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { ProductService } from "./product.service";
import { IpcHandle } from "@doubleshot/nest-electron";
import * as general from "@model/general";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @IpcHandle("createProduct")
  create(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.create(payload);
  }

  @IpcHandle("findAllProduct")
  findAll(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.findAll(payload);
  }

  @IpcHandle("findAllProductPaginated")
  findAllPaginated(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.findAllPaginated(payload);
  }

  @IpcHandle("findOneProduct")
  findOne(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.findOne(payload);
  }

  @IpcHandle("findOneProductByBarcode")
  findOneByBarcode(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.findOneByBarcode(payload);
  }

  @IpcHandle("updateProduct")
  update(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.update(payload);
  }

  @IpcHandle("updateProductActivation")
  updateActivation(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.productService.updateProductActivation(payload);
  }

  // @IpcHandle("removeProduct")
  // remove(@Payload() id: number) {
  //   return this.productService.remove(id);
  // }
}
