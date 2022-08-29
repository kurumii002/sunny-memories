import { configureStore } from "@reduxjs/toolkit";
import { IUser } from "../typings";
import userSliceReducer from "./states/user";

export interface AppStore {
	user: IUser;
}

export default configureStore<AppStore>({
	reducer: {
		user: userSliceReducer,
	},
});
