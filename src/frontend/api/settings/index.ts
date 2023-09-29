import { IPCRendererRequestConfig } from "@model/general";
const { onRequest } = window.electron;

export const getSettings = async () => {
  const response = await onRequest("findAllSettings", null);
  return response;
};

export const putSettings = async ({ body }: IPCRendererRequestConfig) => {
  const response = await onRequest("updateSettings", body!);
  return response;
};
