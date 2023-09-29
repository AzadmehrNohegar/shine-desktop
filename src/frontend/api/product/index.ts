import {
  IPCRendererRequestConfig,
  apiPaginationResponse,
} from "@model/general";

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

export const getProductPagination = async ({
  params,
}: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllProductPaginated", null, params!);
  const { count, results } = response as apiPaginationResponse;
  return { count, results };
};

export const postProductActivation = async ({
  id,
  body,
}: IPCRendererRequestConfig) => {
  const response = await onRequest("updateProductActivation", body!, null, id);
  return response;
};

export const putProduct = async ({ id, body }: IPCRendererRequestConfig) => {
  const response = await onRequest("updateProduct", body!, null, id);
  return response;
};

export const postProduct = async ({ body }: IPCRendererRequestConfig) => {
  const response = await onRequest("createProduct", body!);
  return response;
};

export const postCSV = async ({ body }: IPCRendererRequestConfig) => {
  const response = await onRequest("uploadCSV", body!);
  return response;
};
