import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { OrderService } from "./order.service";
import { IpcHandle } from "@doubleshot/nest-electron";
import * as general from "@model/general";

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @IpcHandle("createOrder")
  create() {
    return this.orderService.create();
  }

  @IpcHandle("findAllOrder")
  findAll(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderService.findAll(payload);
  }

  @IpcHandle("findAllOrderPaginated")
  findAllPaginated(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderService.findAllPaginated(payload);
  }

  @IpcHandle("findOneOrder")
  findOne(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderService.findOne(payload);
  }

  @IpcHandle("removeOrder")
  remove(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderService.remove(payload);
  }

  @IpcHandle("invoiceOrder")
  invoice(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderService.invoice(payload);
  }

  @IpcHandle("excelOrder")
  excel() {
    return this.orderService.excel();
  }
}
