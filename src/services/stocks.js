import { axiosInstance } from "../providers/axiosInstance";

export const getAllstock = () => {
  return axiosInstance.get("/stocks");
};

export const getOneStock = (id) => {
  return axiosInstance.get(`/stocks/${id}`);
};

export const supplyStock = (values, id) => {
  return axiosInstance.patch(`/stocks/supply/${id}`, values);
};

export const extractStock = (values, id) => {
  return axiosInstance.patch(`/stocks/extract/${id}`, values);
};

export const createStock = (values) => {
  return axiosInstance.post("/stocks/create", values);
};

export const deleteStock = (id) => {
  return axiosInstance.delete(`/stocks/delete/${id}`);
};
