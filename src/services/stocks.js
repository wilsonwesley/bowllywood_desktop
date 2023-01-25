import { axiosInstance } from "../providers/axiosInstance";

export const getAllstock = () => {
  return axiosInstance.get("/stocks");
};

export const getOneStock = (id) => {
  return axiosInstance.get(`/stocks/${id}`);
};
