import { axiosInstance } from "../providers/axiosInstance";

	export const createMeal = (values) => {
		return axiosInstance.post('/menus/create', values);
	}

	export const updateMeal = (id, values) => {
		return axiosInstance.post(`/menus/update/${id}`, values);
	}

	export const deleteMeal = (id) => {
		return axiosInstance.delete(`/menus/delete/${id}`);
	}

	export const getOneMeal = (id) => {
		return axiosInstance.get(`/menus/${id}`);
	}

	export const getAllBowls = () => {
		return axiosInstance.get('/menus/admin-list');
	}

	export const imageUpload = (image) => {
		return axiosInstance.post('/menus/image-upload', image);
	}