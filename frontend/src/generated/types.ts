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

export interface ChatDto {
    id: number;
    messages: MessageDto[];
    name: string;
    participants: ChatParticipantDto[];
}

export interface ChatParticipantDto {
    firstName: string;
    id: number;
    lastName: string;
}

export interface ChatSummaryDto {
    id: number;
    lastMessageDate: Date;
    name: string;
    preview: string;
}

export interface MessageDto {
    content: string;
    id: number;
    sender: ChatParticipantDto;
    sentAt: Date;
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
