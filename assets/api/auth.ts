export type LoginPayload = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export async function login({ email, password, rememberMe }: LoginPayload) {
    const body: Record<string, unknown> = { email, password };
    if (rememberMe) body._remember_me = true;

    const res = await fetch('/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
        const msg = data?.message || 'Ошибка входа';
        throw new Error(msg);
    }
    // ожидаем, что success_handler вернёт { user: {...} }
    return data.user as { id: number; email: string; roles: string[] };
}
