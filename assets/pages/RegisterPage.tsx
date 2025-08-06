import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            setSuccess('Успешно зарегистрированы. Пожалуйста, войдите.');
            setTimeout(() => navigate('/login'), 1000);
        } else {
            setError(data.message || 'Ошибка регистрации');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}