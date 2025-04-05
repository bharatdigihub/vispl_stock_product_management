import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    let [sidebarState, setSidebarState] = useState("full");
    const [isSidebarLocked, setIsSidebarLocked] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 991;
            setIsMobileView(isMobile);
            if (!isMobile && sidebarState === "closed") {
                setSidebarState("full");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Ensure it runs on layout change

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [sidebarState, setIsMobileView]); // Add setIsMobileView to dependencies

    const toggleSidebar = () => {
        if (!isSidebarLocked) {
            setSidebarState((prevState) => (prevState === "full" ? "half" : "full"));
        }
    };

    const toggleSidebarLock = () => {
        setIsSidebarLocked((prevState) => !prevState);
        if (!isSidebarLocked) {
            setSidebarState("half");
        }
    };

    const closeSidebar = () => {
        if (isMobileView) { // Ensure it works only if media max width is 991px
            setSidebarState("closed");
        }
    };

    return (
        <SidebarContext.Provider value={{ sidebarState, setSidebarState, isSidebarLocked, toggleSidebar, toggleSidebarLock, closeSidebar, isMobileView }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
