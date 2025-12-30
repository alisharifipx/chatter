import './App.css';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from '@/components/layout/AppContainer.tsx';
import { Login } from '@/components/login/Login.tsx';
import { Registration } from '@/components/login/Registration.tsx';
import { apiGet } from './api/apiClient.ts';
import { QueryKeys } from './api/queryKeys.ts';
import type { AppUserDto } from './generated/types.ts';

function App() {
	const { data: user, isPending } = useQuery({
		queryKey: [QueryKeys.SESSION],
		queryFn: () => apiGet<AppUserDto>('/session'),
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	if (isPending) {
		return;
	}

	return (
		<Routes>
			<Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
			<Route path="/register" element={!user ? <Registration /> : <Navigate to="/" />} />
			<Route path="/" element={user && <AppContainer user={user} />} />
			{/* TODO: handle errors */}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default App;
