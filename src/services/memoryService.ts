import { IMemory } from "../typings";
import axiosInstance from "./config";

/**
 * Obtiene la lista de memorias
 * @returns
 */
export const getMemories = async () => {
	const response = await axiosInstance.get("/api/memories/");
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
		const response = await axiosInstance.post("/api/memories/upload", formData, {
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
	try {
		const response = await axiosInstance.post("/api/memories", body);
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// /**
//  * Función que elimina un story
//  * @param {string} storyID
//  * @returns data
//  */
// export const deleteStory = async (storyID) => {
// 	try {
// 		const response = await axiosInstance.delete(`/api/v1/story/destroy/${storyID}`);
// 		return response.data;
// 	} catch (error) {
// 		return error.message;
// 	}
// };
