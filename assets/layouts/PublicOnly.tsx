// assets/layouts/PublicOnly.tsx
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';

export function PublicOnly({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuthContext();

    if (isLoading) return null;               // ждём первичную инициализацию
    return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}
