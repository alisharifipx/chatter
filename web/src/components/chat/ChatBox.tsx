import type { ReactElement } from 'react';

export function ChatBox(): ReactElement {
	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<div className="bg-muted/50 flex-1 rounded-xl" />
			<div className="bg-muted/50 h-12 rounded-xl shrink-0" />
		</div>
	);
}
