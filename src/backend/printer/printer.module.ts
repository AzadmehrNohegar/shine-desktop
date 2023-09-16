import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterGateway } from './printer.gateway';

@Module({
  providers: [PrinterGateway, PrinterService]
})
export class PrinterModule {}
