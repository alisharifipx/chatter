import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type FormEvent, type ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '@/api/apiClient.ts';
import { QueryKeys } from '@/api/queryKeys.ts';
import chatterLogo from '@/assets/chatter-logo.svg';
import { Button } from '@/components/ui/Button.tsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { Label } from '@/components/ui/Label.tsx';

export function Login(): ReactElement {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: () => {
			const formData = new FormData();
			formData.append('username', email);
			formData.append('password', password);

			return apiPost('/login', formData);
		},
		onSuccess: () => {
			setErrorMessage(null);
			void queryClient.invalidateQueries({ queryKey: [QueryKeys.SESSION] });
		},
		onError: () => setErrorMessage('Incorrect email or password'),
	});

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (errorMessage) {
			return;
		}

		mutate();
	}

	return (
		<div className="min-h-full w-full flex flex-col items-center justify-center bg-background gap-5 p-4">
			<img src={chatterLogo} className="logo" alt="chatter logo" />
			<Card className="w-full max-w-sm">
				<CardHeader className="text-left">
					<CardTitle>Sign in to your account</CardTitle>
				</CardHeader>
				<CardContent>
					<form id="login-form" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="me@example.com"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<a
										// biome-ignore lint/a11y/useValidAnchor: TODO
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password? {/* TODO: Add password reset */}
									</a>
								</div>
								<Input
									id="password"
									type="password"
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
								{errorMessage && (
									<span className="text-sm text-destructive text-left">{errorMessage}</span>
								)}
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button
						form="login-form"
						type="submit"
						className="w-full bg-chatter text-white hover:text-neutral-700"
					>
						{isPending ? 'Signing in...' : 'Sign in'}
					</Button>
					<Button variant="link" onClick={() => navigate('/register')} disabled={isPending}>
						Don't have an account? Sign Up
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
