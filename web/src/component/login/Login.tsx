import {type ChangeEvent, type ReactElement, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {apiPost} from '../../api/apiClient.ts';

type LoginProps = {
    onLoginSuccess: () => void;
};

export function Login({onLoginSuccess}: LoginProps): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation({
        mutationFn: () => {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            return apiPost('/login', formData);
        },
        onSuccess: () => {
            onLoginSuccess();
        },
    });

    function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleLoginClick() {
        mutation.mutate();
    }

    return (
        <div>
            <h2>Log in to chatter</h2>
            <input type="text" placeholder="username" value={username} onChange={handleUsernameChange} required/>
            <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} required/>
            <button onClick={handleLoginClick} disabled={mutation.isPending}>
                {mutation.isPending ? 'Logging in...' : 'Login'}
            </button>
            {mutation.isError && <p className="bg-red-500">Login failed.</p>}
        </div>
    );
}
