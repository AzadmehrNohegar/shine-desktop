import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ElectronModule } from "@doubleshot/nest-electron";
import { BrowserWindow, app } from "electron";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { OrderModule } from "./order/order.module";
import { OrderItemModule } from "./order-item/order-item.module";
import { ProductModule } from "./product/product.module";
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    ElectronModule.registerAsync({
      useFactory: async () => {
        const isDev = !app.isPackaged;
        const win = new BrowserWindow({
          width: 1024,
          height: 768,
          autoHideMenuBar: true,
          webPreferences: {
            contextIsolation: true,
            preload: join(__dirname, "../preload/index.js"),
          },
        });

        win.on("closed", () => {
          win.destroy();
        });

        const URL = isDev
          ? process.env.DS_RENDERER_URL
          : `file://${join(app.getAppPath(), "dist/frontend/index.html")}`;

        win.loadURL(URL as string);

        return { win };
      },
    }),
    OrderModule,
    OrderItemModule,
    ProductModule,
    PrinterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
