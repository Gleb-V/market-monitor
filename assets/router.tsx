import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';
import { AboutPage } from '@/pages/AboutPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PublicOnly } from '@/layouts/PublicOnly';

// guard для приватной области
function ProtectedLayout() {
    const { user, isLoading } = useAuthContext();
    if (isLoading) return null;                 // не показываем глобальный спиннер
    if (!user) return <Navigate to="/login" replace />;
    return <PublicLayout />;
}

export function AppRouter() {
    const { user, isLoading } = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                {/* Публичные страницы (лендинг, контакты) */}
                <Route element={<PublicLayout />}>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                </Route>

                {/* Гостевые страницы (авторизованных не пускаем) */}
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<PublicOnly><LoginPage /></PublicOnly>} />
                    <Route path="/register" element={<PublicOnly><RegisterPage /></PublicOnly>} />
                </Route>

                {/* Приватные страницы */}
                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                {/* Корень */}
                <Route
                    path="/"
                    element={
                        isLoading
                            ? <AboutPage />                   // быстрый первый рендер без спиннера
                            : <Navigate to={user ? '/dashboard' : '/login'} replace />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
