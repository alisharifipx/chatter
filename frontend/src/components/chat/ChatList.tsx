import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { apiGet } from '@/api/apiClient.ts';
import { QueryKeys } from '@/api/queryKeys.ts';
import { ChatListSkeleton } from '@/components/chat/ChatListSkeleton.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar.tsx';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/Sidebar.tsx';
import type { ChatSummaryDto } from '@/generated/types.ts';
import { cn } from '@/lib/utils.ts';

export function ChatList(): ReactElement {
	const { data: chats = [], isLoading } = useQuery({
		queryKey: [QueryKeys.CHATS],
		queryFn: () => apiGet<ChatSummaryDto[]>('/chats'),
	});

	return (
		<SidebarGroup className="px-0">
			<SidebarGroupContent className="overflow-x-hidden">
				{isLoading ? (
					<ChatListSkeleton />
				) : (
					chats.map((chat) => (
						<NavLink
							key={chat.id}
							to={`/chat/${chat.id}`}
							className={({ isActive }) =>
								cn(
									'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-1 pl-2 pr-3 py-4 text-sm leading-tight whitespace-nowrap',
									isActive && 'bg-sidebar-accent',
								)
							}
						>
							<Avatar className="h-12 w-12 rounded-lg">
								<AvatarImage src="" alt={chat.name} />
								<AvatarFallback className="rounded-lg">{chat.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col w-full ml-2 items-center gap-2 overflow-x-hidden">
								<div className="flex w-full justify-between">
									<span className="font-semibold mr-2">{chat.name}</span>
									{/* TODO: fix dates in backend and uncomment line below */}
									{/*<span className="ml-auto text-xs truncate">{chat.lastMessageDate.toString()}</span>*/}
								</div>
								<span className="text-muted-foreground text-nowrap w-full truncate">
									{chat.preview}
								</span>
							</div>
						</NavLink>
					))
				)}
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
