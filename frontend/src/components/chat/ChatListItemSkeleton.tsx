import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui/Skeleton.tsx';

export function ChatListItemSkeleton(): ReactElement {
	return (
		<div className="flex items-center gap-1 pl-2 pr-3 py-4">
			<Skeleton className="h-12 w-12 rounded-lg" />
			<div className="flex flex-col ml-2 items-center overflow-x-hidden gap-2">
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-4 w-40" />
			</div>
		</div>
	);
}
