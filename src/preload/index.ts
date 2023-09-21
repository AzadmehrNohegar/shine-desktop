/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiPaginationResponse, errorResponse } from "@model/general";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  onRequest: async (
    endpoint: string,
    body: Record<string, unknown> | null,
    params?: any,
    id?: number
  ): Promise<
    | Record<string, unknown>
    | apiPaginationResponse
    | Array<Record<string, number | string>>
    | errorResponse
  > => {
    const response = await ipcRenderer.invoke(endpoint, {
      body,
      params,
      id,
    });
    if (response.reason) throw response;
    return response;
  },
  onResponse: (cb: (msg: string) => unknown) => {
    return ipcRenderer.on("reply-msg", (e, msg: string) => {
      cb(msg);
    });
  },
});
