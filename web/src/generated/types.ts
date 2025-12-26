/* tslint:disable */
/* eslint-disable */

export interface AppUserDto {
    accountExpired: boolean;
    accountLocked: boolean;
    credentialsExpired: boolean;
    email: string;
    enabled: boolean;
    id: number;
    username: string;
}

export interface UserSessionDto {
    id: number;
    username: string;
}
