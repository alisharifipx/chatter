import type { ReactElement } from 'react';
import chatterLogo from '@/assets/chatter-icon.svg';

type AppHeaderProps = {
	chatName: string;
};

// TODO: allow toggling sidebar
export function AppHeader({ chatName }: AppHeaderProps): ReactElement {
	// const { toggleSidebar } = useSidebar();

	return (
		<header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
			<div className="flex h-(--header-height) w-full justify-between items-center gap-2 px-3">
				{/*<Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>*/}
				{/*	<SidebarIcon />*/}
				{/*</Button>*/}
				{/*<Separator orientation="vertical" className="mr-2 h-4" />*/}
				<img src={chatterLogo} className="h-8 animate-in duration-700 zoom-in fade-in" alt="chatter logo" />
				<div>{chatName}</div>
				<div></div>
			</div>
		</header>
	);
}
