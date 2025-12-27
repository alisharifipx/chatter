export interface AppUserDto {
	accountExpired: boolean;
	accountLocked: boolean;
	credentialsExpired: boolean;
	email: string;
	enabled: boolean;
	firstName: string;
	id: number;
	lastName: string;
}

export interface NewAppUserRequestDto {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface UserSessionDto {
	email: string;
	id: number;
}
