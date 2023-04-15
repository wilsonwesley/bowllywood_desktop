import {axiosInstance} from '../providers/axiosInstance';

export const createReservation = (values) => {
    return axiosInstance.post('/reservations/create', values);
}

export const getAllReservations = (day) => {
    return axiosInstance.get(`/reservations/admin-list/${day}`);
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

export const getReservationByDay = (day, status) => {
    return axiosInstance.get(`/reservations/day-seats/${day}/${status}`)
}

export const getOneReservation = (id) => {
    return axiosInstance.get(`/reservations/${id}`);
}