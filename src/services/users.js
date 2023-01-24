import {AxiosInstance} from '../providers/axiosInstance';

export const register = (values) => {
    return AxiosInstance.post('/users/add', values);
}

export const editUser = (id) => {
    return AxiosInstance.patch('/users/' + id);
}

export const deleteUser = (id) => {
    return AxiosInstance.delete('/users/' + id);
}

export const loginUser = (values) => {
    return AxiosInstance.post('/users/login/', values);
}

export const getAllUsers = () => {
    return AxiosInstance.get('/users/');
}

export const getUserDetails = (id) => {
    return AxiosInstance.get('/users/' + id);
}

export const getUserFranchiseRequests = (id) => {
    return AxiosInstance.get(`/users/my-franchise-requests/${id}`);
}