import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { SettingsService } from "./settings.service";
import { IpcHandle } from "@doubleshot/nest-electron";
import * as general from "@model/general";

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @IpcHandle("findAllSettings")
  findAll() {
    return this.settingsService.findAll();
  }

  @IpcHandle("updateSettings")
  update(@Payload() payload: general.IPCRendererRequestConfig) {
    return this.settingsService.update(payload);
  }
}
