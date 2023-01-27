import {axiosInstance} from '../providers/axiosInstance';

export const createReservation = (values) => {
    return axiosInstance.post('/reservations/create', values);
}

export const editReservation = (id, values) => {
    return axiosInstance.patch(`/reservations/update/${id}`, values);
}

export const getAllReservations = () => {
    return axiosInstance.get('/reservations/');
}

export const getOneReservation = (id) => {
    return axiosInstance.get(`/reservations/${id}`);
}

export const getReservationsDetails = (id) => {
    return axiosInstance.get(`/reservations/${id}`);
}