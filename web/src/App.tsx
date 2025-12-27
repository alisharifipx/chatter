import './App.css';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ChatLayout} from '@/components/ChatLayout.tsx';
import {Login} from '@/components/login/Login.tsx';
import {apiGet, apiPost} from './api/apiClient.ts';
import {QueryKeys} from './api/queryKeys.ts';
import type {AppUserDto} from './generated/types.ts';

function App() {
    const queryClient = useQueryClient();
    const {data: user} = useQuery({
        queryKey: [QueryKeys.SESSION],
        queryFn: () => apiGet<AppUserDto>('/session'),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    function handleLoginSuccess() {
        void queryClient.invalidateQueries({queryKey: [QueryKeys.SESSION]});
    }

    async function handleLogout() {
        await apiPost('/logout', {});
        queryClient.setQueryData([QueryKeys.SESSION], null);
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={!user ? <Login onLoginSuccess={handleLoginSuccess}/> : <Navigate to="/"/>}
            />
            <Route
                path="/"
                element={user ? <ChatLayout user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>}
            />
            {/* TODO: handle errors */}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default App;
