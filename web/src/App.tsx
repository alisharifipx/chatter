import './App.css';
import chatterLogo from './assets/chatter-logo.svg';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Login} from './component/login/Login.tsx';
import {QueryKeys} from './api/queryKeys.ts';
import {apiGet, apiPost} from './api/apiClient.ts';
import type {UserSessionDto} from './generated/types.ts';

function App() {
    const queryClient = useQueryClient();
    const {data: user, isLoading} = useQuery({
        queryKey: [QueryKeys.SESSION],
        queryFn: () => apiGet<UserSessionDto>('/session'),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
    const isLoggedIn = !!user;

    function handleLoginSuccess() {
        void queryClient.invalidateQueries({queryKey: [QueryKeys.SESSION]});
    }

    async function handleLogout() {
        await apiPost('/logout', {});
        await queryClient.resetQueries({queryKey: [QueryKeys.SESSION]});
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!isLoggedIn) {
        return (
            <>
                <img src={chatterLogo} className="logo" alt="chatter logo"/>
                <Login onLoginSuccess={handleLoginSuccess}/>
            </>
        );
    }

    return (
        <div>
            <header>
                <h1>Welcome back, {user.username}!</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
        </div>
    );
}

export default App;
