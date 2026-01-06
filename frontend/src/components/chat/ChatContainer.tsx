import { useQuery } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import { type ReactElement, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '@/api/apiClient.ts';
import { QueryKeys } from '@/api/queryKeys.ts';
import { ChatBubble } from '@/components/chat/ChatBubble.tsx';
import { ENTER } from "@/components/chat/constants.ts";
import { Input } from '@/components/ui/Input.tsx';
import type { ChatDto } from '@/generated/types.ts';
import { cn } from '@/lib/utils';

export function ChatContainer(): ReactElement {
	const { id } = useParams<{ id: string }>();
	const [message, setMessage] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

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

	function handleSend() {
		setMessage('');
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
			<div className="inline-flex w-full">
				<Input
					ref={inputRef}
					className="flex-1 bg-muted/50 border-muted rounded-lg transition-all duration-200"
					type="text"
					placeholder={`Message...`}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => e.key === ENTER && handleSend()}
				/>
				<button
					type="button"
					onMouseDown={(e) => e.preventDefault()}
					onClick={handleSend}
					className={cn(
						'flex items-center ml-1 justify-center hover:active:scale-90 hover:scale-110 transition-all ease-in-out duration-500',
						message.trim() ? 'w-10' : 'w-0 m-0 opacity-0 scale-0 pointer-events-none',
					)}
				>
					<SendHorizontal />
				</button>
			</div>
		</div>
	);
}
