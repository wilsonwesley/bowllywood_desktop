import { axiosInstance } from "../providers/axiosProvider";

export const getOneMeal = (id) => {
    return axiosInstance.get(`/menus/${id}`);
}

export const getSweetBowls = () => {
    return axiosInstance.get('/menus/desserts');
}

export const getSaltedBowls = () => {
    return axiosInstance.get('/menus/');
}

/*

	export const createMeal = (values) => {
		return axiosInstance.post('/menus/create', values);
	}

	export const updateMeal = (id, values) => {
		return axiosInstance.post(`/menus/update/${id}`, values);
	}

	export const deleteMeal = (id) => {
		return axiosInstance.delete(`/menus/delete/${id}`);
	}

*/