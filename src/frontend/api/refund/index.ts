import { IPCRendererRequestConfig } from "@model/general";

const { onRequest } = window.electron;

export const postRefund = async ({ body }: IPCRendererRequestConfig) => {
  const response = await onRequest("createRefund", body!);
  return response;
};
