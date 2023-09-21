import { Controller } from "@nestjs/common";
import { PosService } from "./pos.service";
import { IpcHandle } from "@doubleshot/nest-electron";
import { Payload } from "@nestjs/microservices";
import * as general from "src/model/general";

@Controller()
export class PosController {
  constructor(private readonly posService: PosService) {}

  @IpcHandle("findAllPos")
  findAll() {
    return this.posService.findAllPos();
  }

  @IpcHandle("createPosTransaction")
  createPosTransaction(@Payload() payload: general.posBody) {
    return this.posService.createPosTransaction(payload);
  }
}
