import {axiosInstance} from '../providers/axiosInstance';

export const register = (values) => {
    return axiosInstance.post('/users/add', values);
}

export const editUser = (id) => {
    return axiosInstance.patch('/users/' + id);
}

export const getUserByRole = (selectedRole) => {
    return axiosInstance.get('/users/usersByRole/' + selectedRole);
}

export const deleteUser = (id) => {
    return axiosInstance.delete('/users/' + id);
}

export const loginUser = (values) => {
    return axiosInstance.post('/users/login/', values);
}

export const getAllUsers = () => {
    return axiosInstance.get('/users/usersList');
}

export const getUserDetails = (id) => {
    return axiosInstance.get('/users/' + id);
}

export const getUserFranchiseRequests = (id) => {
    return axiosInstance.get(`/users/my-franchise-requests/${id}`);
}

export const getCurrentUserDetails = () => {
    return axiosInstance.get('/users/me');
}
