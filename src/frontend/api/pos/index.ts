// import { IPCRendererRequestConfig } from "@model/general";

const { onRequest } = window.electron;

export const getPos = async () => {
  const response = await onRequest("findAllPos", null);
  return response;
};
