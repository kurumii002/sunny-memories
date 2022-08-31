import { IUser } from "../typings";
import axiosInstance from "./config";

/**
 * Login
 */
export const login = async (body: IUser) => {
	const response = await axiosInstance.post("https://sunny-api.onrender.com/api/auth/login", body);
	return response.data;
};

/**
 * Get User
 */
export const getUser = async () => {
	const response = await axiosInstance.get("https://sunny-api.onrender.com/api/auth/getUser");
	return response.data;
};

/**
 * Logout
 */
export const logout = async () => {
	const response = await axiosInstance.get("https://sunny-api.onrender.com/api/auth/logout");
	return response.data;
};
