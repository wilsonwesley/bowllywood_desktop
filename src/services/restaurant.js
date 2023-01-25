import { AxiosInstance } from "../providers/axiosInstance";

export const getAllRestaurants = () => {
	return AxiosInstance.get('/restaurants');
}