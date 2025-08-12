// PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '@/shared/context/AuthContext';
import { NavbarPublic } from '@/components/navbars/NavbarPublic';
import { NavbarAuthed } from '@/components/navbars/NavbarAuthed';

export function PublicLayout() {
    const { user, isLoading } = useAuthContext();

    if (isLoading) return null;

    return (
        <div>
            {user ? <NavbarAuthed /> : <NavbarPublic />}
            <main style={{ padding: 16 }}>
                <Outlet />
            </main>
        </div>
    );
}

