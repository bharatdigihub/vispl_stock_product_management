import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css'; // Import CSS file

createInertiaApp({
    resolve: (name) => import(`./Components/${name}`), // Dynamically load components based on route
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
