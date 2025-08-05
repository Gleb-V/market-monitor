export function useAuth() {
    // Пока что просто всегда "авторизован"
    return {
        isAuthenticated: true,
        user: null,
    };
}
