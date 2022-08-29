import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../../typings";
import { clearsSessionStorage, persistsSessionStorage } from "../../utilities";

export const EmptyUserState: IUserInfo = {
	username: "",
	avatarUrl: "",
};

/**
 * Crea el state en la aplicacion
 */
export const userSlice = createSlice({
	name: "user",
	initialState: sessionStorage.getItem("user") //si hay info del usuario
		? JSON.parse(sessionStorage.getItem("user") as string)
		: EmptyUserState,
	reducers: {
		createUser: (state, action) => { //setea el usuario
			persistsSessionStorage<IUserInfo>("user", action.payload);
			return action.payload;
		},
		updateUser: (state, action) => { //actualiza el usuario
			const result = { ...state, ...action.payload };
			persistsSessionStorage<IUserInfo>("user", result);
			return result;
		},
		resetUser: () => { //elimina al usuario
			clearsSessionStorage("user");
			return EmptyUserState;
		},
	},
});

//exportar las acciones
export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
