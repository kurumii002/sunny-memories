import { IUser } from "../typings";
import axiosInstance from "./config";

/**
 * Login
 */
export const login = async (body: IUser) => {
	const response = await axiosInstance.post("/auth/login", body);
	return response.data;
};

/**
 * Logout
 */
export const logout = async () => {
	const response = await axiosInstance.get("/auth/logout");
	return response.data;
};
