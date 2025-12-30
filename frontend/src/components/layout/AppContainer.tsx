import { type ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBox } from '@/components/chat/ChatBox.tsx';
import { AppHeader } from '@/components/layout/header/AppHeader.tsx';
import { AppSideBar } from '@/components/layout/sidebar/AppSideBar.tsx';
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar.tsx';
import type { AppUserDto } from '@/generated/types.ts';

type ChatLayoutProps = {
	user: AppUserDto;
};

export function AppContainer({ user }: ChatLayoutProps): ReactElement {
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);

	return (
		<div className="flex h-screen w-full flex-col [--header-height:--spacing(14)]">
			<SidebarProvider className="flex flex-col flex-1">
				<AppHeader chatName="chatter" />
				<div className="flex flex-1 overflow-hidden">
					<AppSideBar user={user} loading={false} />
					<SidebarInset>
						<ChatBox />
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
