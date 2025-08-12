// assets/api/auth.ts
export type LoginPayload = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

async function parseJsonSafe(res: Response) {
    const text = await res.text();          // читаем как текст
    if (!text) return {};                   // 204/пусто
    try { return JSON.parse(text); }        // пробуем JSON
    catch {
        // если пришёл HTML/редирект — кинем понятную ошибку
        throw new Error(`Сервер вернул не-JSON (${res.status}): ${text.slice(0, 120)}`);
    }
}

export async function login({ email, password, rememberMe }: LoginPayload) {
    const body: Record<string, unknown> = { email, password };
    if (rememberMe) body._remember_me = true;

    const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',       // просим JSON
        },
        body: JSON.stringify(body),
    });

    const text = await res.text();
    let data: any = {};
    if (text) {
        try { data = JSON.parse(text); } catch { throw new Error(`Сервер вернул не-JSON (${res.status})`); }
    }
    if (!res.ok) throw new Error(data?.message || 'Ошибка входа');
    return data.user as { id: number; email: string; roles: string[] };
}

export async function register(payload: { email: string; password: string }) {
    const res = await fetch('/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',       // тоже просим JSON
        },
        body: JSON.stringify(payload),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) {
        const msg = (data as any)?.message || 'Ошибка регистрации';
        throw new Error(msg);
    }
    return data;
}
