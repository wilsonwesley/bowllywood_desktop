import {axiosInstance} from '../providers/axiosInstance';

export const createReservation = (values) => {
    return axiosInstance.post('/reservations/create', values);
}

export const getAllReservations = () => {
    return axiosInstance.get('/reservations/admin-list');
}

export const getUserReservations = () => {
    return axiosInstance.get('/reservations/');
}

export const editReservation = (id, values) => {
    return axiosInstance.patch(`/reservations/update/${id}`, values);
}

export const cancelReservation = (id) => {
    return axiosInstance.patch(`/reservations/cancel/${id}`);
}

export const getOneReservation = (id) => {
    return axiosInstance.get(`/reservations/${id}`);
}

export const getReservationsDetails = (id) => {
    return axiosInstance.get(`/reservations/${id}`);
}