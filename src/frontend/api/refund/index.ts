import { AxiosCustomRequestConfig, http } from "@frontend/services";

export const postRefund = async ({ body }: AxiosCustomRequestConfig) => {
  const response = await http.post("/refund/refund/bulk_add/", body);
  const data = await response.data;
  return data;
};
