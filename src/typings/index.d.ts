export interface IMemory {
	name: string;
	description: string;
	createdOn: Date;
	author: Omit<IUser, "password">;
	imageUrl: string;
}

export interface IUser {
	avatarUrl?: string;
	username: string;
	password: string;
}

export interface ISession {
	username: string;
	avatarUrl: string;
	iat: number;
	exp: number;
}

export interface ILoginResponse {
	error?: string;
	message: string;
	token: string;
}

export type IUserInfo = Pick<IUser, "username" | "avatarUrl">;
