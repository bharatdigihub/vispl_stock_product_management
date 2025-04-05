import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS
import '../css/app.css'; // Import CSS file
import { ThemeProvider } from './Contexts/ThemeContext'; // Import ThemeProvider
import { SidebarProvider } from './Contexts/SidebarContext'; // Import SidebarProvider

createInertiaApp({
    resolve: (name) => import(`./Components/${name}`), // Dynamically load components based on route
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <SidebarProvider>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </SidebarProvider>
        );
    },
    //progress: false, // Disable the nprogress bar
});
