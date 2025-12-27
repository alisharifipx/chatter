import type {AppUserDto} from "@/generated/types.ts";
import type {ReactElement} from "react";

type ChatLayoutProps = {
    user: AppUserDto;
    onLogout: () => void;
}

export function ChatLayout({user, onLogout}: ChatLayoutProps): ReactElement {
    function handleLogout() {
        onLogout();
    }

    return (
        <div className="h-full w-full">
            <header>
                <h1>Welcome back, {user.firstName}!</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
        </div>
    )
}
