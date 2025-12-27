import type {ReactElement} from 'react';
import {Button} from '@/components/ui/button.tsx';
import type {AppUserDto} from '@/generated/types.ts';

type ChatLayoutProps = {
    user: AppUserDto;
    onLogout: () => void;
};

export function ChatLayout({user, onLogout}: ChatLayoutProps): ReactElement {
    function handleLogout() {
        onLogout();
    }

    return (
        <div className="h-full w-full">
            <header>
                <h1>Welcome back, {user.firstName}!</h1>
                <Button onClick={handleLogout}>Logout</Button>
            </header>
        </div>
    );
}
