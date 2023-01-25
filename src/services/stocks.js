import { axiosInstance } from "../providers/axiosInstance";

export const getAllstock = () => {
  return axiosInstance.get("/stocks");
};
