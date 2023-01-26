import { axiosInstance } from "../providers/axiosInstance";

export const addFranchiseRequest = (values) => {
	return axiosInstance.post('/franchiseRequests/add', values);
}

export const getFranchiseRequestDetail = (id) => {
    return axiosInstance.get(`/franchiseRequests/${id}`);
}

export const editFranchiseRequest = (values, id) => {
	return axiosInstance.patch(`/franchiseRequests/edit/${id}`, values);
}

export const cancelFranchiseRequest = (id) => {
	return axiosInstance.delete(`/franchiseRequests/cancel/${id}`);
}

