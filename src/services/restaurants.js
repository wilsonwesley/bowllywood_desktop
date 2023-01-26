import { axiosInstance } from "../providers/axiosInstance";

export const getAllRestaurants = () => {
  return axiosInstance.get("/restaurants");
};
