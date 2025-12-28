import { useQueryClient } from '@tanstack/react-query';
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';
import type { ReactElement } from 'react';
import { apiPost } from '@/api/apiClient.ts';
import { QueryKeys } from '@/api/queryKeys.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu.tsx';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/Sidebar.tsx';
import { Skeleton } from '@/components/ui/Skeleton.tsx';
import type { AppUserDto } from '@/generated/types.ts';

type NavUserProps = {
	user: AppUserDto;
	loading?: boolean;
};

export function NavUser({ user, loading }: NavUserProps): ReactElement {
	const queryClient = useQueryClient();
	const { isMobile } = useSidebar();

	if (loading) {
		return (
			<SidebarMenuButton size="lg">
				<Skeleton className="h-8 w-8 rounded-lg" />
				<div className="flex flex-col items-center overflow-x-hidden gap-1">
					<Skeleton className="h-4 w-30" />
					<Skeleton className="h-3 w-30" />
				</div>
			</SidebarMenuButton>
		);
	}

	const userFullName = `${user.firstName} ${user.lastName}`;
	const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

	async function handleLogout() {
		await apiPost('/logout', {});
		queryClient.setQueryData([QueryKeys.SESSION], null);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src="" alt={userFullName} />
								<AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{userFullName}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src="" alt={userFullName} />
									<AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{userFullName}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
