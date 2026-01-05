import type { ReactElement } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar.tsx';
import type { UserSearchResultDto } from '@/generated/types.ts';

type SearchListProps = {
	results: UserSearchResultDto[];
	onSearchResultSelect: (chat: UserSearchResultDto) => void;
	loading: boolean;
};

export function SearchList({ results, loading, onSearchResultSelect }: SearchListProps): ReactElement {
	if (loading) {
		// TODO: add loading placeholder?
		return <div className="p-4 text-sm text-muted-foreground"></div>;
	}

	if (results.length === 0) {
		return <div className="p-4 text-sm text-center text-muted-foreground">No users found.</div>;
	}

	return (
		<div className="flex flex-col gap-1 p-2">
			{results.map((u) => (
				<button
					type="button"
					key={u.id}
					className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg text-sm text-left"
					onClick={() => onSearchResultSelect(u)}
				>
					<Avatar className="h-10 w-10 rounded-lg">
						<AvatarImage src="" alt={`${u.firstName} ${u.lastName}`} />
						<AvatarFallback className="rounded-lg">{u.firstName.charAt(0)}</AvatarFallback>
					</Avatar>
					<span>{`${u.firstName} ${u.lastName}`}</span>
				</button>
			))}
		</div>
	);
}
