import { Outlet } from 'react-router-dom';

export function AnonLayout() {
    return (
        <div>
            {/* Здесь может быть гостевой хедер или логотип */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}
