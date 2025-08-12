import { NavLink } from 'react-router-dom';

export function NavbarPublic() {
    return (
        <nav style={navStyle}>
            <div style={left}>
                <NavLink to="/about" style={link}>О проекте</NavLink>
                <NavLink to="/contacts" style={link}>Контакты</NavLink>
            </div>
            <div style={right}>
                <NavLink to="/login" style={buttonLink}>Войти</NavLink>
                <NavLink to="/register" style={buttonOutline}>Регистрация</NavLink>
            </div>
        </nav>
    );
}

// простые инлайн-стили чтоб не плодить css файлы
const navStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', borderBottom: '1px solid #e5e7eb'
};
const left: React.CSSProperties = { display: 'flex', gap: 16 };
const right: React.CSSProperties = { display: 'flex', gap: 8 };

const link: React.CSSProperties = { textDecoration: 'none', color: '#111827' };
const buttonLink: React.CSSProperties = {
    textDecoration: 'none', padding: '6px 12px', background: '#111827', color: 'white', borderRadius: 6
};
const buttonOutline: React.CSSProperties = {
    textDecoration: 'none', padding: '6px 12px', border: '1px solid #111827', color: '#111827', borderRadius: 6
};
