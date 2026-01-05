import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '@/api/apiClient.ts';
import { QueryKeys } from '@/api/queryKeys.ts';
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
			<span className="font-bold text-center text-lg">{chat.name}</span>
			<div className="bg-muted/30 flex-1 rounded-xl p-4 overflow-y-auto">
				{chat.messages.map((message) => (
					<div key={message.id} className="mb-3 rounded-lg">
						<div>{message.sender.firstName}</div>
						<p>{message.content}</p>
					</div>
				))}
			</div>
			<div className="bg-muted/50 h-14 rounded-xl shrink-0 flex items-center px-4">
				<input
					className="w-full bg-transparent border-none focus:ring-0"
					placeholder={`Message ${chat.name}...`}
				/>
			</div>
		</div>
	);
}
