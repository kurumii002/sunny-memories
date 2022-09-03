import { cookieService } from ".";
import { IMemory } from "../typings";
import axios from "./config";

/**
 * Obtiene la lista de memorias
 * @returns
 */
export const getMemories = async () => {
	axios.defaults.headers.common = { Authorization: `Bearer ${cookieService.getSessionCookie()}` };
	const response = await axios.get("/memories/");
	return response.data;
};

// /**
//  * Recupera una story por ID
//  * @param {*} body
//  * @returns data
//  */
// export const getStoryByID = async (id) => {
// 	try {
// 		const response = await axios.get(`/api/v1/story/story/${id}`);
// 		return response.data;
// 	} catch (error) {
// 		return error.message;
// 	}
// };

/**
 * Sube la imagen a Cloudinary
 */
export const uploadImage = async (image: string) => {
	const formData = new FormData();
	//const imagefile = document.querySelector('#file');
	formData.append("img", image);

	try {
		axios.defaults.headers.common = { Authorization: `Bearer ${cookieService.getSessionCookie()}` };
		const response = await axios.post("/memories/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		return false;
	}
};

/**
 * Crea una memoria
 */
export const createMemory = async (body: IMemory) => {
	axios.defaults.headers.common = { Authorization: `Bearer ${cookieService.getSessionCookie()}` };
	const response = await axios.post("/memories", body);
	return response.data;
};

// /**
//  * Función que elimina un story
//  * @param {string} storyID
//  * @returns data
//  */
// export const deleteStory = async (storyID) => {
// 	try {
//		axios.defaults.headers.common = { Authorization: `Bearer ${cookieService.getSessionCookie()}` };
// 		const response = await axios.delete(`/api/v1/story/destroy/${storyID}`);
// 		return response.data;
// 	} catch (error) {
// 		return error.message;
// 	}
// };
