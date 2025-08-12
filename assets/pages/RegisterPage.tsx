// assets/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';
import { register, login } from '@/api/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setError(null);
        setLoading(true);

        const start = Date.now();
        try {
            // 1) Регистрация
            await register({ email, password });

            // 2) Небольшая пауза (если регистрация была мгновенной)
            const elapsed = Date.now() - start;
            const minShow = 2000; // «немного подождать»
            if (elapsed < minShow) await wait(minShow - elapsed);

            // 3) Авторизация теми же данными
            const user = await login({ email, password, rememberMe });
            setUser(user);

            // 4) Переход в кабинет
            navigate('/dashboard');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    disabled={loading}
                />
            </div>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    disabled={loading}
                />
                <span>Запомнить меня</span>
            </label>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ minWidth: 160, minHeight: 36 }}
                >
                    {loading ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            <LoadingSpinner />
                            <span></span>
                        </div>
                    ) : (
                        'Зарегистрироваться'
                    )}
                </button>
            </div>
        </form>
    );
}
