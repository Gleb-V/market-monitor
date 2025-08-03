import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import '../styles/app.css';
import { createRoot } from 'react-dom/client';
import React from 'react';

function App() {
    return <h1>Привет из React!</h1>;
}

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(<App />);
}

