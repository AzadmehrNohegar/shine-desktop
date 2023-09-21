import { Global, Module } from "@nestjs/common";
import { PosService } from "./pos.service";
import { PosController } from "./pos.controller";

@Global()
@Module({
  providers: [PosService],
  controllers: [PosController],
  exports: [PosService],
})
export class PosModule {}
