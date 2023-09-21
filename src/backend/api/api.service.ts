import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as general from "src/model/general";

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpService) {}

  async postPos(payload: general.IPCRendererRequestConfig) {
    const { body } = payload;

    // const { Amount, PayerId, ServiceCode, Url, PcID } = body as general.posBody;

    console.log(body);

    // const result = await this.http.axiosRef.post(Url!, {
    //   headers: {
    //     Accept: "*/*",
    //     Connection: "keep-alive",
    //     "Content-Type": "application/json",
    //     "X-PINGARUNER": "pingpong",
    //   },
    //   body: {
    //     ServiceCode,
    //     Amount,
    //     PayerId,
    //     PcID,
    //   },
    // });

    return {};
  }
}
