import { axiosInstance } from "../providers/axiosInstance";

export const addFranchiseRequest = (values) => {
  return axiosInstance.post("/franchiseRequests/add", values);
};

export const getFranchiseRequestDetail = (id) => {
  return axiosInstance.get(`/franchiseRequests/${id}`);
};

export const getAllFranchiseRequests = () => {
  return axiosInstance.get("/franchiseRequests");
};

export const acceptFranchiseRequest = (id) => {
  return axiosInstance.patch(`/franchiseRequests/accepted/${id}`);
};

export const editFranchiseRequest = (values, id) => {
  return axiosInstance.patch(`/franchiseRequests/edit/${id}`, values);
};

export const refuseFranchiseRequest = (id) => {
  return axiosInstance.patch(`/franchiseRequests/refused/${id}`);
};

export const cancelFranchiseRequest = (id) => {
  return axiosInstance.delete(`/franchiseRequests/cancel/${id}`);
};
