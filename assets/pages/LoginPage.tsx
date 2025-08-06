import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setUser } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const res = await fetch('/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.user) {
            setUser(data.user);
            navigate('/dashboard');
        } else {
            setError(data.message || 'Ошибка входа');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Войти</button>
        </form>
    );
}
