import { IUser } from "../typings";
import axios from "./config";

/**
 * Login
 */
export const login = async (body: IUser) => {
	const response = await axios.post("/auth/login", body);
	return response.data;
};

/**
 * Logout, elimina cookies
 */
export const logout = async () => {
	axios.defaults.headers.common = { Authorization: "" };
	//TODO
};
