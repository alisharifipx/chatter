import {useMutation} from '@tanstack/react-query';
import {type FormEvent, type ReactElement, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {apiPost} from '@/api/apiClient.ts';
import chatterLogo from '@/assets/chatter-logo.svg';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import type {AppUserDto, NewAppUserRequestDto} from '@/generated/types.ts';

export function Registration(): ReactElement {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: () => {
			const formData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			} satisfies NewAppUserRequestDto;

			return apiPost<AppUserDto>('/register', formData);
		},
		onSuccess: () => navigate('/login'),
		onError: (error) => console.error(error),
	});

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		mutate();
	}

	return (
		<div className="flex flex-col gap-5">
			<img src={chatterLogo} className="logo" alt="chatter logo" />
			<Card className="w-full max-w-sm">
				<CardHeader className="text-left">
					<CardTitle>Sign in to your account</CardTitle>
				</CardHeader>
				<CardContent>
					<form id="registrationForm" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="firstName">First name</Label>
								<Input
									id="firstName"
									type="text"
									placeholder="John"
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="lastName">Last name</Label>
								<Input
									id="lastName"
									type="text"
									placeholder="Smith"
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="me@example.com"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									id="password"
									type="password"
									minLength={8}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="passwordConfirm">Confirm password</Label>
								</div>
								<Input
									id="passwordConfirm"
									type="password"
									minLength={8}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
								/>
								{error && <span className="text-sm text-destructive text-left">{error}</span>}
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button
						form="registrationForm"
						type="submit"
						disabled={isPending}
						className="w-full bg-chatter text-white hover:text-neutral-700"
					>
						{isPending ? 'Signing up...' : 'Sign up'}
					</Button>
					<Button variant="link" onClick={() => navigate('/login')}>
						Already have an account? Sign in
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
