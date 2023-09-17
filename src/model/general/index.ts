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
