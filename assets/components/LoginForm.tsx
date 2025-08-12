import { useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type Props = {
    onSubmit: (email: string, password: string, rememberMe: boolean) => void;
    error?: string | null;
    loading?: boolean;
};

export function LoginForm({ onSubmit, error, loading = false }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!loading) onSubmit(email, password, rememberMe);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Вход</h2>

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
                    autoComplete="current-password"
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
                <button type="submit" disabled={loading} style={{ minWidth: 120, minHeight: 36 }}>
                    {loading ? (
                        // компактный спинер в кнопке
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <LoadingSpinner />
                            <span></span>
                        </div>
                    ) : (
                        'Войти'
                    )}
                </button>
            </div>
        </form>
    );
}
