import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { RefundService } from "./refund.service";
import { IpcHandle } from "@doubleshot/nest-electron";
import * as general from "@model/general";

@Controller()
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @IpcHandle("createRefund")
  create(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.refundService.create(payload);
  }

  @IpcHandle("findAllRefund")
  findAll() {
    return this.refundService.findAll();
  }

  @IpcHandle("findOneRefund")
  findOne(@Payload() id: number) {
    return this.refundService.findOne(id);
  }

  // @IpcHandle("updateRefund")
  // update(@Payload() updateRefundDto: unknown) {
  //   return this.refundService.update(updateRefundDto.id, updateRefundDto);
  // }

  @IpcHandle("removeRefund")
  remove(@Payload() id: number) {
    return this.refundService.remove(id);
  }
}
