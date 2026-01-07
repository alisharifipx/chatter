import { useQuery } from '@tanstack/react-query';
import { type ComponentProps, useState } from 'react';
import { apiGet } from '@/api/apiClient.ts';
import { ChatList } from '@/components/chat/ChatList.tsx';
import { CHATS_TAB, FRIENDS_TAB } from '@/components/chat/constants.ts';
import { SearchList } from '@/components/chat/SearchList.tsx';
import { SearchForm } from '@/components/form/SearchForm.tsx';
import { NavUser } from '@/components/layout/sidebar/NavUser.tsx';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/Sidebar.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs.tsx';
import type { AppUserDto, UserSearchResultDto } from '@/generated/types.ts';
import { useDebounce } from '@/hooks/useDebounce.ts';

interface AppSideBarProps extends ComponentProps<typeof Sidebar> {
	user: AppUserDto;
	onSearchResultSelect: (chat: UserSearchResultDto) => void;
	loading: boolean;
}

function AppSideBar({ user, loading, onSearchResultSelect, ...props }: AppSideBarProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	// Fetch search results based on debounced term
	const { data: searchResults, isFetching } = useQuery({
		queryKey: ['userSearch', debouncedSearchTerm],
		queryFn: () => apiGet<UserSearchResultDto[]>(`/users/search?query=${debouncedSearchTerm}`),
		enabled: debouncedSearchTerm.length > 0,
		retry: 2,
	});

	const isSearching = debouncedSearchTerm.length > 0;

	return (
		<Tabs defaultValue={CHATS_TAB}>
			<Sidebar
				collapsible="none"
				className="top-(--header-height) h-[calc(100svh-var(--header-height))]"
				{...props}
			>
				<SidebarHeader className="border-b transition-all duration-100 ease-in-out group-data-[state=collapsed]:border-none overflow-hidden">
					<TabsList className="w-full">
						<TabsTrigger value={CHATS_TAB}>{CHATS_TAB}</TabsTrigger>
						<TabsTrigger value={FRIENDS_TAB}>{FRIENDS_TAB}</TabsTrigger>
					</TabsList>
					<div className="flex flex-col gap-3 transition-opacity duration-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:invisible whitespace-nowrap">
						<SearchForm onSearchChange={setSearchTerm} />
					</div>
				</SidebarHeader>
				<SidebarContent>
					{isSearching ? (
						<SearchList
							results={searchResults ?? []}
							loading={isFetching}
							onSearchResultSelect={onSearchResultSelect}
						/>
					) : (
						<>
							<TabsContent value={CHATS_TAB}>
								<ChatList />
							</TabsContent>
							<TabsContent value={FRIENDS_TAB}></TabsContent>
						</>
					)}
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={user} loading={loading} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</Tabs>
	);
}

export default AppSideBar;
