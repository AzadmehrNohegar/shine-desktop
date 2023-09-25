import {
  IPCRendererRequestConfig,
  apiPaginationResponse,
} from "@model/general";

const { onRequest } = window.electron;

export const getOrder = async ({ params }: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllOrder", null, params!);
  return response;
};

export const getOrderPagination = async ({
  params,
}: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllOrderPaginated", null, params!);
  const { count, results } = response as apiPaginationResponse;
  return { count, results };
};

export const getOrderById = async ({ id }: IPCRendererRequestConfig) => {
  const response = await onRequest("findOneOrder", null, null, id);
  return response as Record<string, unknown>;
};

export const postOrderByIdInvoice = async ({
  id,
}: IPCRendererRequestConfig) => {
  const response = await onRequest("invoiceOrder", null, null, id);
  return response;
};

export const postOrder = async ({ body }: IPCRendererRequestConfig) => {
  const response = await onRequest("createOrderItem", body!);
  return response;
};

export const putOrderItem = async ({ id, body }: IPCRendererRequestConfig) => {
  const response = await onRequest("updateOrderItem", body!, null, id);
  return response;
};

export const deleteOrderItem = async ({ id }: IPCRendererRequestConfig) => {
  const response = await onRequest("removeOrderItem", null, null, id);
  return response;
};

export const deleteOrder = async ({ id }: IPCRendererRequestConfig) => {
  const response = await onRequest("removeOrder", null, null, id);
  return response;
};
