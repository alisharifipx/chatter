import type { ReactElement } from "react";
import type { MessageDto } from "@/generated/types.ts";
import { cn } from "@/lib/utils.ts";

type ChatBubbleProps = {
	message: MessageDto;
	isMe: boolean;
};

export function ChatBubble({ message, isMe }: ChatBubbleProps): ReactElement {
	return (
		<div className={cn('flex flex-col w-full', isMe && 'items-end')}>
			{!isMe && <div className="text-muted-foreground text-sm ms-3">{message.sender.firstName}</div>}
			<div
				className={cn(
					'mb-3 rounded-xl border w-fit max-w-[60%] py-1 px-3',
					isMe ? 'bg-chatter text-white' : 'bg-secondary',
				)}
			>
				{message.content}
			</div>
		</div>
	);
}
