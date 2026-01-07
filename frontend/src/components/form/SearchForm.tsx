import { Search } from 'lucide-react';
import type { ComponentProps } from 'react';
import { SidebarInput } from '@/components/ui/Sidebar.tsx';

type SearchFormProps = ComponentProps<'form'> & {
	onSearchChange: (value: string) => void;
};

export function SearchForm({ onSearchChange }: SearchFormProps) {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div className="relative">
				<SidebarInput
					id="search"
					placeholder="Search..."
					className="h-8 pl-7"
					onChange={(e) => onSearchChange(e.target.value)}
				/>
				<Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50" />
			</div>
		</form>
	);
}
