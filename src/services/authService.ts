import { ILoginResponse, IUser } from "../typings";
import { AxiosError } from "axios";
import { cookieService } from "../services";
import axios from "./config";

/**
 * Reliza la petición de Login, establece la cookie
 * @param body Credenciales
 * @returns Response del API
 */
export const login = async (body: IUser): Promise<void> => {
	try {
		const response = await axios.post<ILoginResponse>("/auth/login", body);
		cookieService.setSessionCookie(response.data.token);

	} catch (error) {
		if (!(error instanceof AxiosError)) {
			//si no es un error de axios
			throw new Error("Ocurrió un error inesperado...");
		}

		//lanza el error del request (con su mensaje de error)
		const error_msg = (error as AxiosError<ILoginResponse>).response?.data;
		throw new Error(error_msg?.error);
	}
};

/**
 * Verifica si el usuario tiene una sesión válida o está autenticado
 */
export const isValidSession = (): boolean => {
	if (cookieService.getSessionCookie()) {
		return true;
	}

	return false;
};

/**
 * Logout, elimina la autorizacion y la cookie de sesion
 */
export const logout = (): void => {
	cookieService.clearSessionCookie();
	axios.defaults.headers.common = { Authorization: "" };
};
