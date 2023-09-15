import { AxiosCustomRequestConfig, http } from "@frontend/services";
import { IPCRendererRequestConfig } from "src/types/general";

const { onRequest } = window.electron;

export const getOrder = async ({ params }: IPCRendererRequestConfig) => {
  const response = await onRequest("findAllOrder", null, params!);
  return response;
};

export const getOrderById = async ({ id }: AxiosCustomRequestConfig) => {
  const response = await http.get(`/order/order/${id}/`);
  const data = await response.data;
  return data;
};

export const postOrderByIdInvoice = async ({
  id,
}: AxiosCustomRequestConfig) => {
  const response = await http.post(`/order/order/${id}/invoice/`);
  const data = await response.data;
  return data;
};

export const postOrder = async ({ body }: AxiosCustomRequestConfig) => {
  const response = await onRequest("createOrderItem", body);
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
