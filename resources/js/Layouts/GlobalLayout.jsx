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
            setSidebarState("closed"); // Ensure sidebar stays closed on small screens after redirection
        }
    };

    return (
        <div className={`tw-d-flex tw-flex-column tw-min-h-screen tw-overflow-x-hidden ${theme.background} ${theme.text}`}>
            <div className="tw-d-flex tw-flex-grow-1">
                {/* Sidebar */}
                <CSidebar
                    visible={sidebarState !== "closed"}
                    className={`
                        ${theme.sidebar} ${theme.sidebarText}
                        tw-transition-all tw-fixed tw-top-0 tw-left-0 tw-min-h-screen ${
                        sidebarState === "full" ? "sidebar-full" : sidebarState === "half" ? "sidebar-half" : "sidebar-closed"
                    }`}
                >
                    <div className={`tw-text-center tw-mt-4 tw-font-bold tw-text-lg tw-flex tw-justify-between px-3 lg:tw-justify-center tw-items-center ${theme.sidebarText}`}>
                        {sidebarState === "full" ? "VSIPL" : "VSL"}
                        {isMobileView && (
                            <button
                                onClick={() => setSidebarState("closed")}
                                className={`tw-w-10 tw-h-10 tw-rounded-full tw-ml-2 ${theme.button}`}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <CSidebarNav className={`tw-mt-6 ${theme.mode === "dark" ? "tw-bg-black" : ""} `}>
                        <li>
                            <Link
                                href="/dashboard"
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded-md ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "Dashboard"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-300 ${theme.text}`
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
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded-md ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "User Management"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-300 ${theme.text}`
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
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded-md ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "Roles"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-300 ${theme.text}`
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
                                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded-md ${sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"} ${
                                    currentPage === "Permissions"
                                        ? "tw-bg-indigo-500 tw-text-white" // Active menu item styling
                                        : `hover:tw-bg-indigo-300 ${theme.text}`
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
                    className={`tw-w-auto tw-px-0 tw-transition-all tw-min-vh-100 tw-flex-grow-1 content-${
                        sidebarState
                    } ${theme.background} ${theme.text}`}
                >
                    <Header toggleSidebar={toggleSidebar} currentPage={currentPage} />
                    <CCol className="tw-p-5">{children}</CCol>
                </CContainer>
            </div>
        </div>
    );
};

export default GlobalLayout;