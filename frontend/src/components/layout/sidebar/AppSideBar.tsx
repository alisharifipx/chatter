import type { ComponentProps } from 'react';
import { ChatList } from '@/components/chat/ChatList.tsx';
import { NavUser } from '@/components/layout/sidebar/NavUser.tsx';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/Sidebar.tsx';
import type { AppUserDto } from '@/generated/types.ts';

interface AppSideBarProps extends ComponentProps<typeof Sidebar> {
	user: AppUserDto;
	loading?: boolean;
}

export function AppSideBar({ user, loading, ...props }: AppSideBarProps) {
	return (
		<Sidebar collapsible="none" className="top-(--header-height) h-[calc(100svh-var(--header-height))]" {...props}>
			<SidebarHeader className="border-b transition-all duration-100 ease-in-out group-data-[state=collapsed]:border-none overflow-hidden">
				<div className="flex flex-col gap-3 transition-opacity duration-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:invisible whitespace-nowrap">
					<div className="flex w-full items-center justify-between ml-2">
						<div className="text-foreground text-base font-medium">Chats</div>
						{/*TODO: Add 'Unread' switch*/}
						{/*<Label className="flex items-center gap-2 text-sm">*/}
						{/*	<span>Unread</span>*/}
						{/*	<Switch className="shadow-none" />*/}
						{/*</Label>*/}
					</div>
					{/*TODO: Add search functionality*/}
					{/*<SidebarInput placeholder="Search chats..." />*/}
				</div>
			</SidebarHeader>
			<SidebarContent>
				<ChatList loading={loading} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} loading={loading} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
