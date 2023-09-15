/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    electron: {
      onRequest: (
        endpoint: string,
        body: Record<string, unknown> | null,
        params?: any,
        id?: number
      ) => Promise<
        Record<string, unknown> | Array<Record<string, number | string>>
      >;
      onResponse(cb: (msg: string) => unknown): void;
    };
  }
}

export {};
