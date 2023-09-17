import { IPCRendererRequestConfig } from "@model/general";

const { onRequest } = window.electron;

export const getProduct = async ({ params }: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllProduct", null, params);
  return response;
};

export const getProductById = async ({ id }: IPCRendererRequestConfig) => {
  const response = await onRequest("findOneProduct", null, null, id);
  return response;
};

export const getProductByBarcode = async ({
  body,
}: IPCRendererRequestConfig) => {
  const response = await onRequest("findOneProductByBarcode", body!);
  return response;
};
