import { axiosInstance } from "../providers/axiosInstance";

export const addSupplier = (values) => {
  return axiosInstance.post("/suppliers/add", values);
};

export const getAllSuppliers = () => {
  return axiosInstance.get("/suppliers");
};

export const getSupplierDetail = (id) => {
  return axiosInstance.get(`/suppliers/${id}`);
};

export const deleteSupplier = (id) => {
  return axiosInstance.delete(`/suppliers/delete/${id}`);
};
