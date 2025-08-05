import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthedLayout } from './layouts/AuthedLayout';
import { AnonLayout } from './layouts/AnonLayout';
import { useAuth } from './shared/hooks/useAuth';

export function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* Публичные маршруты */}
                <Route element={<AnonLayout />}>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Защищённые маршруты */}
                <Route
                    element={
                        isAuthenticated ? <AuthedLayout /> : <Navigate to="/login" replace />
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                {/* Редирект с корня */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}