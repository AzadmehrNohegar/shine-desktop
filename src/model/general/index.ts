export interface IDictionary<T> {
  [Key: string]: T;
}

export interface IPCRendererRequestConfig {
  id?: number;
  slug?: string;
  body?: Record<string, unknown>;
  params?: Record<string, string | number>;
}

export type apiPaginationResponse = {
  count: number;
  results: unknown[];
};

export type rejectionOrderItem = {
  order_item: number;
  quantity: number;
  max_quantity: number;
  name: string;
};

export type orderTypes = "temp" | "completed" | "refunded";

export const ORDER_TYPES: IDictionary<orderTypes> = {
  temp: "temp",
  completed: "completed",
  refunded: "refunded",
};
