import { axiosInstance } from "../providers/axiosProvider";

export const getOneIngredient = (id) => {
    return axiosInstance.get(`/ingredients/${id}`);
}

export const getAllIngredients = (cat) => {
    return axiosInstance.get(`/ingredients/list/${cat}`);
}