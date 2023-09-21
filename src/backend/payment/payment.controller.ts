import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { PaymentService } from "./payment.service";
import * as general from "src/model/general";
import { IpcHandle } from "@doubleshot/nest-electron";

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @IpcHandle("createPayment")
  create(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.paymentService.create(payload);
  }

  // @IpcHandle("findAllPayment")
  // findAll() {
  //   return this.paymentService.findAll();
  // }

  // @IpcHandle("findOnePayment")
  // findOne(@Payload() id: number) {
  //   return this.paymentService.findOne(id);
  // }

  // @IpcHandle("updatePayment")
  // update(@Payload() updatePaymentDto: unknown) {
  //   return this.paymentService.update(2, updatePaymentDto);
  // }

  // @IpcHandle("removePayment")
  // remove(@Payload() id: number) {
  //   return this.paymentService.remove(id);
  // }
}
