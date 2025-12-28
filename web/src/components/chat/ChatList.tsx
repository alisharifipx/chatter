import type { ReactElement } from 'react';
import { ChatListSkeleton } from '@/components/chat/ChatListSkeleton.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar.tsx';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/Sidebar.tsx';

type ChatListProps = {
	loading?: boolean;
};

export function ChatList({ loading }: ChatListProps): ReactElement {
	return (
		<SidebarGroup className="px-0">
			<SidebarGroupContent className="overflow-x-hidden">
				{loading ? (
					<ChatListSkeleton />
				) : (
					chats.map((chat) => (
						<a
							// biome-ignore lint/a11y/useValidAnchor: TODO
							href="#"
							key={chat.name}
							className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-1 pl-2 pr-3 py-4 text-sm leading-tight whitespace-nowrap"
						>
							<Avatar className="h-12 w-12 rounded-lg">
								<AvatarImage src="" alt={chat.name} />
								<AvatarFallback className="rounded-lg">{chat.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col w-full ml-2 items-center gap-2 overflow-x-hidden">
								<div className="flex w-full justify-between">
									<span className="font-semibold">{chat.name}</span>{' '}
									<span className="ml-auto text-xs">{chat.date}</span>
								</div>
								<span className="text-muted-foreground text-nowrap w-full truncate">
									{chat.lastMessage}
								</span>
							</div>
						</a>
					))
				)}
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

const chats = [
	{
		name: 'Liam Henderson',
		date: '2m',
		lastMessage: 'Just sent over the final designs for the new dashboard. Let me know what you think!',
		unread: true,
	},
	{
		name: 'Emma Rodriguez',
		date: '45m',
		lastMessage: 'Are we still meeting at 3 PM? I have some updates regarding the API integration.',
		unread: true,
	},
	{
		name: 'James Chen',
		date: '2h',
		lastMessage: "I'll be a bit late to the standup today. Please start without me!",
		unread: false,
	},
	{
		name: 'Olivia Smith',
		date: '5h',
		lastMessage: "Thanks for the feedback on the PR. I've pushed the requested changes.",
		unread: false,
	},
	{
		name: 'Noah Vancamp',
		date: '1d',
		lastMessage: 'Did you catch the game last night? That last-minute goal was insane!',
		unread: true,
	},
	{
		name: 'Ava Thompson',
		date: '1d',
		lastMessage: 'The client approved the proposal! We can move forward with the next phase on Monday.',
		unread: false,
	},
	{
		name: 'Ethan Hunt',
		date: '2d',
		lastMessage: "Don't forget to submit your expense reports by the end of the day.",
		unread: false,
	},
	{
		name: 'Mia Wallace',
		date: '3d',
		lastMessage: 'Can you send me the link to that documentation we were looking at yesterday?',
		unread: true,
	},
	{
		name: 'Lucas Gray',
		date: '4d',
		lastMessage: 'The server migration is complete. Please report any bugs you find in the #dev channel.',
		unread: false,
	},
	{
		name: 'Isabella Ross',
		date: '5d',
		lastMessage: 'Happy Birthday! Hope you have a fantastic day and get plenty of cake.',
		unread: false,
	},
	{
		name: 'Sophia White',
		date: '1w',
		lastMessage:
			"To celebrate our recent project success, I'd like to organize a team dinner. Are you available next Friday evening?",
		unread: true,
	},
	{
		name: 'William Baker',
		date: '2w',
		lastMessage:
			"It was great catching up last month. Let's make sure we don't go that long without a coffee again.",
		unread: false,
	},
];
