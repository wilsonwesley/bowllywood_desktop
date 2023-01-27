import { axiosInstance } from "../providers/axiosInstance";

export const getAllKitchenEvents = () => {
  return axiosInstance.get("/kitchencalendar/");
};
