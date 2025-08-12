import { useState } from 'react';

type Props = {
    onSubmit: (email: string, password: string, rememberMe: boolean) => void;
    error?: string | null;
};

export function LoginForm({ onSubmit, error }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password, rememberMe);
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
                />
            </div>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                />
                <span>Запомнить меня</span>
            </label>

            <div>
                <button type="submit">Войти</button>
            </div>
        </form>
    );
}
