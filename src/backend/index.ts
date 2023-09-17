import { NestFactory } from "@nestjs/core";
import { app } from "electron";
import type { MicroserviceOptions } from "@nestjs/microservices";
import { ElectronIpcTransport } from "@doubleshot/nest-electron";
import { AppModule } from "./app.module";
import WebSocket from "ws";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

async function electronAppInit() {
  const isDev = !app.isPackaged;
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  if (isDev) {
    if (process.platform === "win32") {
      process.on("message", (data) => {
        if (data === "graceful-exit") app.quit();
      });
    } else {
      process.on("SIGTERM", () => {
        app.quit();
      });
    }
  }

  await app.whenReady();
}

async function bootstrap() {
  try {
    await electronAppInit();

    const nestApp = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        strategy: new ElectronIpcTransport("IpcTransport"),
      }
    );

    await nestApp.listen();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    app.quit();
  }
}

export const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");
  ws.on("message", (data) => {
    console.log("data received \n " + data);
    wss.clients.forEach(function (client) {
      console.log("here");
      client.send(data);
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

bootstrap();
