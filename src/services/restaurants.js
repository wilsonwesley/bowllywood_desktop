import { axiosInstance } from "../providers/axiosInstance";

export const addRestaurant = (values) => {
  return axiosInstance.post("/restaurants/add", values);
};

export const getAllRestaurants = () => {
  return axiosInstance.get("/restaurants");
};

export const getRestaurantDetail = (id) => {
  return axiosInstance.get(`/restaurants/${id}`);
};

export const editRestaurant = (values, id) => {
  return axiosInstance.patch(`/restaurants/edit/${id}`, values);
};
