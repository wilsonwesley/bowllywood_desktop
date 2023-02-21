import { axiosInstance } from "../providers/axiosInstance";

export const addRestaurant = (values) => {
  return axiosInstance.post("/restaurants/add", values);
};

export const getAllRestaurants = () => {
  return axiosInstance.get("/restaurants");
};
