import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { login } from '@/api/auth';

export function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
        setError(null);
        try {
            const user = await login({ email, password, rememberMe });
            setUser(user);
            navigate('/dashboard');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка входа');
        }
    };

    return <LoginForm onSubmit={handleLogin} error={error} />;
}
