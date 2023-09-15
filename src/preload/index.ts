/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  onRequest: (
    endpoint: string,
    body: Record<string, unknown> | null,
    params?: any,
    id?: number
  ): Promise<
    Record<string, unknown> | Array<Record<string, number | string>>
  > =>
    ipcRenderer.invoke(endpoint, {
      body,
      params,
      id,
    }),
  onResponse: (cb: (msg: string) => unknown) =>
    ipcRenderer.on("reply-msg", (e, msg: string) => {
      cb(msg);
    }),
});
