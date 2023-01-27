import { axiosInstance } from "../providers/axiosInstance";

export const getAllKitchenEvents = () => {
    return axiosInstance.get('/kitchencalendar/');
}

export const addKitchenEvent = (values) => {
    return axiosInstance.post('kitchencalendar/add', values)
}