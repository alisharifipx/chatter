import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '@/api/apiClient.ts';
import { QueryKeys } from '@/api/queryKeys.ts';
import { ChatBubble } from '@/components/chat/ChatBubble.tsx';
import type { ChatDto } from '@/generated/types.ts';

export function ChatBox(): ReactElement {
	const { id } = useParams<{ id: string }>();

	const { data: chat, isLoading } = useQuery({
		queryKey: [QueryKeys.CHAT, id],
		queryFn: () => apiGet<ChatDto>(`/chat/${id}`),
		enabled: !!id,
	});

	if (isLoading) {
		return <div className="flex h-full flex-col items-center justify-center text-muted-foreground">Loading...</div>;
	}

	if (!chat) {
		return (
			<div className="flex h-full flex-col items-center justify-center text-muted-foreground">
				Find a friend and start chatting!
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<div className="bg-muted/30 flex-1 rounded-xl p-4 overflow-y-auto">
				{chat.messages.map((message) => (
					// TODO: map whether the message is from the logged in user.
					//  maybe add a flag to the message in the backend?
					//  not sure how it'll work with live chat messages though.
					<ChatBubble key={message.id} message={message} isMe={message.sender.id === 1} />
				))}
			</div>
			<div className="bg-muted/50 min-h-10 rounded-xl shrink-0 flex items-center px-4">
				<input
					className="w-full bg-transparent text-wrap border-none focus:ring-0"
					placeholder={`Message...`}
				/>
			</div>
		</div>
	);
}
