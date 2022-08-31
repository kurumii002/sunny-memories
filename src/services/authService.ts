import { IUser } from "../typings";
import axiosInstance from "./config";

/**
 * Login
 */
export const login = async (body: IUser) => {
	const response = await axiosInstance.post("/api/auth/login", body);
	return response.data;
};

/**
 * Get User
 */
export const getUser = async () => {
	const response = await axiosInstance.get("/api/auth/getUser");
	return response.data;
};

/**
 * Logout
 */
export const logout = async () => {
	const response = await axiosInstance.get("/api/auth/logout");
	return response.data;
};
