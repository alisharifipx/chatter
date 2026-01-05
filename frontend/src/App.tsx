import './App.css';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatBox } from '@/components/chat/ChatBox.tsx';
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

	if (!user) {
		return (
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/chat" element={<AppContainer user={user} />}>
				<Route path=":id" element={<ChatBox />} />
			</Route>
			<Route path="*" element={<Navigate to="/chat" />} />
		</Routes>
	);
}

export default App;
