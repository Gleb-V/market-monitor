import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';
import { AboutPage } from '@/pages/AboutPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnonLayout } from '@/layouts/AnonLayout';
import { AuthedLayout } from '@/layouts/AuthedLayout';

export function AppRouter() {
    const { user, isLoading } = useAuthContext();

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    const isAuthenticated = Boolean(user);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AnonLayout />}>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route
                    element={
                        isAuthenticated ? <AuthedLayout /> : <Navigate to="/login" replace />
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? '/dashboard' : '/about'} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}
