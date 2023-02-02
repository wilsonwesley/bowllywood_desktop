import { axiosInstance } from "../providers/axiosInstance";

export const addSupplier = (values) => {
  return axiosInstance.post("/suppliers/add", values);
};

export const getAllSuppliers = () => {
  return axiosInstance.get("/suppliers");
};
