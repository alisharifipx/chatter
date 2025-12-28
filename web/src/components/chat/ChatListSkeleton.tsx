import type { ReactElement } from 'react';
import { ChatListItemSkeleton } from '@/components/chat/ChatListItemSkeleton.tsx';

export function ChatListSkeleton(): ReactElement {
	return (
		<div className="flex flex-col">
			{Array.from({ length: 10 }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: not needed
				<div key={i}>
					<ChatListItemSkeleton />
				</div>
			))}
		</div>
	);
}
