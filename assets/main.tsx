import { createRoot } from 'react-dom/client';
import { AppRouter } from './router';
import { AuthProvider } from './shared/context/AuthContext';
import './styles/app.css';

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}
