import { AxiosCustomRequestConfig, http } from "@frontend/services";

export const getRemittanceProvider = async ({
  params,
}: AxiosCustomRequestConfig) => {
  const response = await http.get("/remittance/provider/", {
    params,
  });
  const { results, count, next } = await response.data;
  return { results, count, next };
};

export const getRemittance = async ({ params }: AxiosCustomRequestConfig) => {
  const response = await http.get("/remittance/remittance/", { params });
  const { results, count, next } = await response.data;
  return { results, count, next };
};

export const getRemittanceById = async ({ id }: AxiosCustomRequestConfig) => {
  const response = await http.get(`/remittance/remittance/${id}/`);
  const data = await response.data;
  return data;
};

export const postRemittance = async ({ body }: AxiosCustomRequestConfig) => {
  const response = await http.post("/remittance/remittance/", body);
  const data = response.data;
  return data;
};

export const postRemittanceItem = async ({
  body,
}: AxiosCustomRequestConfig) => {
  const response = await http.post("/remittance/remittance_item/", body);
  const data = await response.data;
  return data;
};

export const deleteRemittanceItem = async ({
  id,
}: AxiosCustomRequestConfig) => {
  const response = await http.delete(`/remittance/remittance_item/${id}/`);
  const data = await response.data;
  return data;
};

export const deleteRemittance = async ({ id }: AxiosCustomRequestConfig) => {
  const response = await http.delete(`/remittance/remittance/${id}/`);
  const data = await response.data;
  return data;
};

export const putRemittance = async ({ id, body }: AxiosCustomRequestConfig) => {
  const response = await http.put(`/remittance/remittance/${id}/`, body);
  const data = await response.data;
  return data;
};
