import { http } from "@frontend/services";
import { IPCRendererRequestConfig } from "@model/general";

const { onRequest } = window.electron;

export const postPayment = async ({ body }: IPCRendererRequestConfig) => {
  const response = await onRequest("createPayment", body!);
  return response;
};

export const getPaymentPos = async () => {
  const response = await http.get("/payment/pos/");
  const data = await response.data;
  return data;
};
