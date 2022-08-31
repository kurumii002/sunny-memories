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

export type IUserInfo = Pick<IUser, "username" | "avatarUrl">;
