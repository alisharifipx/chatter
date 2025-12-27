import {useMutation} from '@tanstack/react-query';
import {type ChangeEvent, type ReactElement, useState} from 'react';
import {apiPost} from '@/api/apiClient.ts';
import chatterLogo from '@/assets/chatter-logo.svg';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';

type LoginProps = {
    onLoginSuccess: () => void;
};

export function Login({onLoginSuccess}: LoginProps): ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation({
        mutationFn: () => {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            return apiPost('/login', formData);
        },
        onSuccess: () => {
            onLoginSuccess();
        },
    });

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleLoginClick() {
        mutation.mutate();
    }

    return (
        <div className="flex flex-col gap-5 animate-in fade-in zoom-in duration-700">
            <img src={chatterLogo} className="logo" alt="chatter logo"/>
            <Card className="w-full max-w-sm">
                <CardHeader className="text-left">
                    <CardTitle>Sign in to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="me@example.com"
                                    required
                                    onChange={handleEmailChange}
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
                                <Input id="password" type="password" required onChange={handlePasswordChange}/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit"
                        className="w-full bg-chatter text-white hover:text-neutral-700"
                        onClick={handleLoginClick}
                    >
                        Login
                    </Button>
                    <Button variant="link">Don't have an account? Sign Up</Button> {/* TODO: Add registration page */}
                </CardFooter>
            </Card>
        </div>
    );
}
