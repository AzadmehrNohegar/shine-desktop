import { AxiosCustomRequestConfig, http } from "@frontend/services";

export const postPayment = async ({ body }: AxiosCustomRequestConfig) => {
  const response = await http.post("/payment/create_payment/", body);
  const data = await response.data;
  return data;
};

export const getPaymentPos = async () => {
  const response = await http.get("/payment/pos/");
  const data = await response.data;
  return data;
};
