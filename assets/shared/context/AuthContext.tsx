import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
    id: number;
    email: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/initialize', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user);
                setTimeout(() => setIsLoading(false), 2000);
            })
            .catch(() => {
                setUser(null);
                setTimeout(() => setIsLoading(false), 2000);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
    return ctx;
}
