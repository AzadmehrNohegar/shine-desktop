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
  findOne(@Payload() id: number) {
    return this.orderService.findOne(id);
  }

  // @IpcHandle("updateOrder")
  // update(@Payload() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(updateOrderDto.id, updateOrderDto);
  // }

  @IpcHandle("removeOrder")
  remove(@Payload() { id }: general.IPCRendererRequestConfig) {
    return this.orderService.remove(id!);
  }
}
