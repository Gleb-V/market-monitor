import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';

export function NavbarAuthed() {
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Symfony logout firewall path
            await fetch('/logout', { method: 'POST', credentials: 'include' });
        } catch {}
        setUser(null);
        navigate('/login', { replace: true });
    };

    return (
        <nav style={navStyle}>
            <div style={left}>
                <NavLink to="/dashboard" style={link}>Дашборд</NavLink>
                <NavLink to="/about" style={link}>О проекте</NavLink>
                <NavLink to="/contacts" style={link}>Контакты</NavLink>
            </div>
            <div style={right}>
                <button onClick={handleLogout} style={buttonDanger}>Выйти</button>
            </div>
        </nav>
    );
}

const navStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', borderBottom: '1px solid #e5e7eb'
};
const left: React.CSSProperties = { display: 'flex', gap: 16 };
const right: React.CSSProperties = { display: 'flex', gap: 8 };

const link: React.CSSProperties = { textDecoration: 'none', color: '#111827' };
const buttonDanger: React.CSSProperties = {
    padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'
};
