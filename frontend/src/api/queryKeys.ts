/**
 * Unique keys used for TanStack Query caching and invalidation.
 */
export const QueryKeys = {
	SESSION: 'session',
	CHAT: 'chat',
	CHATS: 'chats',
} as const;

/**
 * Union type representing all valid query keys defined in QueryKeys.
 */
export type QueryKey = (typeof QueryKeys)[keyof typeof QueryKeys];
