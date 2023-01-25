import { AxiosInstance } from "../providers/axiosInstance";

export const getAllKitchenEvents = () => {
    return AxiosInstance.get('/kitchencalendar/');
}