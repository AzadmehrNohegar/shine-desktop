/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiPaginationResponse } from "@model/general";

declare global {
  interface Window {
    electron: {
      onRequest: (
        endpoint: string,
        body: Record<string, unknown> | null,
        params?: any,
        id?: number | null,
        data?: FormData
      ) => Promise<
        | Record<string, unknown>
        | Array<Record<string, number | string>>
        | apiPaginationResponse
      >;
      onResponse(cb: (msg: string) => unknown): void;
    };
  }
}

export {};
