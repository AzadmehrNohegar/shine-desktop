import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { OrderItemService } from "./order-item.service";
import * as general from "@model/general";
import { IpcHandle } from "@doubleshot/nest-electron";

@Controller()
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @IpcHandle("createOrderItem")
  create(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderItemService.create(payload);
  }

  @IpcHandle("updateOrderItem")
  update(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.orderItemService.update(payload);
  }

  @IpcHandle("removeOrderItem")
  remove(@Payload() { id }: general.IPCRendererRequestConfig) {
    return this.orderItemService.remove(id!);
  }
}
