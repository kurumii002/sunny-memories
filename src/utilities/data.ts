/**
 * Guarda los datos en el session storage
 * @param key Identificador
 * @param value Datos a guardar
 */
export const persistsSessionStorage = <T>(key: string, value: T) => {
	sessionStorage.setItem(key, JSON.stringify({ ...value }));
};

/**
 * Elimina los datos del session storage
 * @param key Identificador
 */
export const clearsSessionStorage = (key: string) => {
	sessionStorage.removeItem(key);
};
