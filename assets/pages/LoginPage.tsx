import { useState } from 'react';
import { useAuthContext } from '@/shared/context/AuthContext';
import { login } from '@/api/auth';
import { LoginForm } from '@/components/LoginForm';

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function LoginPage() {
    const { setUser } = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
        if (isSubmitting) return;

        setError(null);
        setIsSubmitting(true);
        const start = Date.now();

        try {
            const user = await login({ email, password, rememberMe });
            const elapsed = Date.now() - start;
            const minShow = 1000; // минимальная задержка спинера
            if (elapsed < minShow) await wait(minShow - elapsed);

            setUser(user);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка входа');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LoginForm
            onSubmit={handleLogin}
            error={error}
            loading={isSubmitting}
        />
    );
}
