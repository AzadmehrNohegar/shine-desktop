import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { PrinterService } from './printer.service';
import { CreatePrinterDto } from './dto/create-printer.dto';
import { UpdatePrinterDto } from './dto/update-printer.dto';

@WebSocketGateway()
export class PrinterGateway {
  constructor(private readonly printerService: PrinterService) {}

  @SubscribeMessage('createPrinter')
  create(@MessageBody() createPrinterDto: CreatePrinterDto) {
    return this.printerService.create(createPrinterDto);
  }

  @SubscribeMessage('findAllPrinter')
  findAll() {
    return this.printerService.findAll();
  }

  @SubscribeMessage('findOnePrinter')
  findOne(@MessageBody() id: number) {
    return this.printerService.findOne(id);
  }

  @SubscribeMessage('updatePrinter')
  update(@MessageBody() updatePrinterDto: UpdatePrinterDto) {
    return this.printerService.update(updatePrinterDto.id, updatePrinterDto);
  }

  @SubscribeMessage('removePrinter')
  remove(@MessageBody() id: number) {
    return this.printerService.remove(id);
  }
}
