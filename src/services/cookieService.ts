import jwt_decode from "jwt-decode";
import { ISession } from "../typings";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/**
 * Guarda el token en una cookie de seison
 * @param token Token a guardar
 */
export const setSessionCookie = (token: string): void => {
	const token_data = jwt_decode(token) as ISession;
	
	//asigna el tiempo de expiración (86_400s = 24 horas)
	const token_exp = token_data.exp - token_data.iat;
	const now = new Date();
	const expiry = new Date(+now + token_exp * 1_000);

	cookies.set("session_info", token, {
		expires: expiry,
		// sameSite: "lax",
		// secure: false,
	});
};

/**
 * Obtiene los datos de sesion de una cookie
 */
export const getSessionCookie = (): string => {
	return cookies.get("session_info");
};

/**
 * Elimina la cookie de sesion
 */
export const clearSessionCookie = (): void => {
	//TODO -> invalidar jwt desde el api
	cookies.remove("session_info");
};
