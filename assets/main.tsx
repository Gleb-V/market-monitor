import { createRoot } from 'react-dom/client';
import { AppRouter } from './router'; // наш роутинг
import './styles/app.css';

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(<AppRouter />);
}
