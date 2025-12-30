import './App.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from '@/components/layout/AppContainer.tsx';
import { Login } from '@/components/login/Login.tsx';
import { Registration } from '@/components/login/Registration.tsx';
import { apiGet } from './api/apiClient.ts';
import { QueryKeys } from './api/queryKeys.ts';
import type { AppUserDto } from './generated/types.ts';

function App() {
	const queryClient = useQueryClient();
	const { data: user, isPending } = useQuery({
		queryKey: [QueryKeys.SESSION],
		queryFn: () => apiGet<AppUserDto>('/session'),
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	// TODO: move this out of here and into Login, then navigate back on login.
	function handleLoginSuccess() {
		void queryClient.invalidateQueries({ queryKey: [QueryKeys.SESSION] });
	}

	return (
		<Routes>
			<Route
				path="/login"
				element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />}
			/>
			<Route path="/register" element={!user ? <Registration /> : <Navigate to="/" />} />
			<Route path="/" element={<AppContainer user={user!} loading={isPending} />} />
			{/* TODO: handle errors */}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default App;
