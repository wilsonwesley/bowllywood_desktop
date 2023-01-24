import { axiosInstance } from "../providers/axiosInstance";

export const getOneIngredient = (id) => {
    return axiosInstance.get(`/ingredients/${id}`);
}

export const getAllIngredients = (cat) => {
    return axiosInstance.get(`/ingredients/list/${cat}`);
}