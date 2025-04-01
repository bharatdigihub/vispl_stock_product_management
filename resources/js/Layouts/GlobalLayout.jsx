import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@inertiajs/react";
import { CSidebar, CSidebarNav, CContainer, CCol } from "@coreui/react";
import { cilSpeedometer, cilUser, cilSettings, cilLockLocked } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext

const GlobalLayout = ({ children }) => {
    const { theme } = useTheme(); // Use ThemeContext
    const [sidebarState, setSidebarState] = useState("full"); // "full", "half", or "closed"
    const [currentPage, setCurrentPage] = useState("");
    const [isMobileView, setIsMobileView] = useState(false); // Track if the view is mobile

    useEffect(() => {
        // Set the initial page name based on the current URL path
        const pathToPageName = {
            "/dashboard": "Dashboard",
            "/users": "User Management",
            "/roles": "Roles",
            "/permissions": "Permissions",
        };
        const currentPath = window.location.pathname;
        setCurrentPage(pathToPageName[currentPath] || "Admin Panel");

        // Add a resize listener to detect mobile view
        const handleResize = () => {
            const isMobile = window.innerWidth <= 992;
            setIsMobileView(isMobile);
            if (!isMobile) {
                setSidebarState("full"); // Reset sidebar to full for desktop view
            } else {
                setSidebarState("half"); // Default to partially collapsed for mobile view
            }
        };

        handleResize(); // Check on initial load
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarState((prevState) => (prevState === "full" ? "half" : "full"));
    };

    const handleMenuItemClick = (pageName) => {
        setCurrentPage(pageName); // Update the current page
        if (isMobileView) {
            setSidebarState("closed"); // Close sidebar on small screens after redirection
        }
    };

    return (
        <div className={`tw-d-flex tw-flex-column tw-min-h-screen tw-overflow-x-hidden ${theme.background} ${theme.text}`}>
            <div className="tw-d-flex tw-flex-grow-1">
                {/* Sidebar */}
                <CSidebar
                    visible={sidebarState !== "closed"}
                    className={`
                        ${theme.background} ${theme.text}
                        tw-transition-all tw-fixed tw-ml-0 tw-top-0 tw-left-0 tw-h-full ${
                        sidebarState === "full" ? "tw-w-64" : sidebarState === "half" ? "tw-w-20" : "tw-w-0"
                    }`}
                >
                    <div className={`tw-text-center tw-mt-4 tw-font-bold tw-text-lg ${theme.text}`}>
                        {sidebarState === "full" ? "VSIPL" : "VSL"}
                    </div>
                    <CSidebarNav className={`tw-mt-6 ${theme.mode === "dark" ? "tw-bg-dark" : ""}`}>
                        <li>
                            <Link
                                href="/dashboard"
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "Dashboard"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-100 ${theme.text}`
                                }`}
                                onClick={() => handleMenuItemClick("Dashboard")}
                            >
                                <CIcon icon={cilSpeedometer} className={`${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"}`} />
                                {sidebarState === "full" && "Dashboard"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/users"
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "User Management"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-100 ${theme.text}`
                                }`}
                                onClick={() => handleMenuItemClick("User Management")}
                            >
                                <CIcon icon={cilUser} className={`${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"}`} />
                                {sidebarState === "full" && "User Management"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/roles"
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "Roles"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-100 ${theme.text}`
                                }`}
                                onClick={() => handleMenuItemClick("Roles")}
                            >
                                <CIcon icon={cilSettings} className={`${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"}`} />
                                {sidebarState === "full" && "Roles"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/permissions"
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "Permissions"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-100 ${theme.text}`
                                }`}
                                onClick={() => handleMenuItemClick("Permissions")}
                            >
                                <CIcon icon={cilLockLocked} className={`${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"}`} />
                                {sidebarState === "full" && "Permissions"}
                            </Link>
                        </li>
                    </CSidebarNav>
                </CSidebar>

                {/* Main Content */}
                <CContainer
                    fluid
                    className={`tw-px-0 tw-transition-all tw-min-vh-100 tw-pl-0 tw-flex-grow-1 ${theme.background} ${theme.text} ${
                        sidebarState === "full" ? "tw-pl-64" : sidebarState === "half" ? "tw-pl-20" : "tw-pl-0"
                    }`}
                >
                    <Header toggleSidebar={toggleSidebar} currentPage={currentPage} />
                    <CCol className="tw-p-5">{children}</CCol>
                </CContainer>
            </div>
        </div>
    );
};

export default GlobalLayout;