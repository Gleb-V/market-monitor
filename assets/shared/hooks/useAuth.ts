import { useState, useEffect } from 'react';

export function useAuth() {
    const [user, setUser] = useState<{ id: number; email: string; roles: string[] } | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        fetch('/initialize', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                setInitialized(true);
            })
            .catch(() => {
                setUser(null);
                setInitialized(true);
            });
    }, []);

    return {
        user,
        isAuthenticated: !!user,
        initialized,
    };
}
