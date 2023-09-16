import { IPCRendererRequestConfig } from "@model/general";

const { onRequest } = window.electron;

export const getProduct = async ({ params }: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllProduct", null, params);
  return response;
};
