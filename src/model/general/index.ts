export interface IDictionary<T> {
  [Key: string]: T;
}

export interface IPCRendererRequestConfig {
  id?: number;
  slug?: string;
  body?: Record<string, unknown>;
  params?: Record<string, string | number | null>;
  data?: FormData;
}

export type apiPaginationResponse = {
  count: number;
  results: unknown[];
};

export type errorResponse = {
  reason: string;
};

export type rejectionOrderItem = {
  order_item: number;
  quantity: number;
  max_quantity: number;
  name: string;
};

export type posBody = {
  ServiceCode: string;
  Amount: number;
  PayerId: string;
  PcID: string;
  PosId: number;
  Url?: string;
};

export type orderTypes = "temp" | "completed" | "refunded";

export const ORDER_TYPES: IDictionary<orderTypes> = {
  temp: "temp",
  completed: "completed",
  refunded: "refunded",
};
