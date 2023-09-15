import { IPCRendererRequestConfig } from "src/types/general";

const { onRequest } = window.electron;

export const getProduct = async ({ params }: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllProduct", null, params);
  return response;
};
