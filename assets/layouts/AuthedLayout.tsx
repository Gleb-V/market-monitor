import { Outlet } from 'react-router-dom';

export function AuthedLayout() {
    return (
        <div>
            {/* Здесь позже появится навигация, логотип и т.д. */}
            <header>
                <p>Вы вошли в систему</p>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
