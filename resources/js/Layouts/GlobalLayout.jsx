import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@inertiajs/react";
import { CSidebar, CSidebarNav, CContainer, CCol } from "@coreui/react";
import { cilSpeedometer, cilUser, cilSettings, cilLockLocked, cilUserFemale, cilWallet, cilChevronBottom, cilChevronTop } from "@coreui/icons"; // Add new icons
import CIcon from "@coreui/icons-react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import NavLink, { DropdownMenu } from "../Components/NavLink";

const GlobalLayout = ({ children }) => {
    const { theme } = useTheme(); // Use ThemeContext
    const [sidebarState, setSidebarState] = useState("full"); // "full", "half", or "closed"
    const [currentPage, setCurrentPage] = useState("");
    const [isMobileView, setIsMobileView] = useState(false); // Track if the view is mobile
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
    const [isSidebarLocked, setIsSidebarLocked] = useState(false); // State to lock the sidebar

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
        if (!isSidebarLocked) {
            setSidebarState((prevState) => (prevState === "full" ? "half" : "full"));
        }
    };

    const toggleSidebarLock = () => {
        setIsSidebarLocked((prevState) => !prevState);
        if (!isSidebarLocked) {
            setSidebarState("half"); // Lock the sidebar in "half" state
        }
    };

    const handleMenuItemClick = (pageName) => {
        setCurrentPage(pageName); // Update the current page
        if (isMobileView) {
            setSidebarState("closed"); // Ensure sidebar stays closed on small screens after redirection
        } else if (isSidebarLocked) {
            setSidebarState("half"); // Ensure sidebar stays half if locked
        }
    };

    const handleMouseEnter = () => {
        if (isSidebarLocked && sidebarState === "half") {
            setSidebarState("full");
        }
    };

    const handleMouseLeave = () => {
        if (isSidebarLocked && sidebarState === "full") {
            setSidebarState("half");
        }
    };

    return (
        <div className={`tw-d-flex tw-flex-column tw-min-h-screen tw-overflow-x-hidden ${theme.background} ${theme.text}`}>
            <div className="tw-d-flex tw-flex-grow-1">
                {/* Sidebar */}
                <CSidebar
                    visible={sidebarState !== "closed"}
                    onMouseEnter={isSidebarLocked ? handleMouseEnter : undefined}
                    onMouseLeave={isSidebarLocked ? handleMouseLeave : undefined}
                    className={`
                        tw-bg-gray-950 tw-text-white tw-h-screen Sidebar background always gray-950
                        tw-transition-all tw-fixed tw-top-0 tw-left-0 tw-min-h-screen ${
                        sidebarState === "full" ? "sidebar-full" : sidebarState === "half" ? "sidebar-half" : "sidebar-closed"
                    }`}
                >
                    <div className={`tw-text-center tw-h-[74px] tw-font-bold tw-text-2xl tw-flex tw-justify-between px-3 lg:tw-justify-center tw-items-center tw-border-b tw-border-gray-800  tw-text-gray-50 tw-tracking-widest`}>
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
                    <CSidebarNav className="">
                        <div
                            className={`tw-text-sm mb-2 tw-font-bold tw-uppercase tw-text-gray-400 tw-px-3 tw-py-2 ${
                                sidebarState === "half" ? "tw-hidden" : "tw-transition-all tw-duration-300 tw-delay-150"
                            }`}
                        >
                            Dashboard
                        </div>
                        <li>
                            <NavLink
                                href="/dashboard"
                                icon={cilSpeedometer}
                                active={currentPage === "Dashboard"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Dashboard")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/users"
                                icon={cilUser}
                                active={currentPage === "User Management"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("User Management")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                User Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/roles"
                                icon={cilSettings}
                                active={currentPage === "Roles"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Roles")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Roles
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/permissions"
                                icon={cilLockLocked}
                                active={currentPage === "Permissions"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Permissions")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Permissions
                            </NavLink>
                        </li>
                        <div
                            className={`tw-text-sm mt-2 tw-font-bold tw-uppercase tw-text-gray-400 tw-px-3 tw-py-2 ${
                                sidebarState === "half" ? "tw-hidden" : "tw-transition-all tw-duration-300 tw-delay-150"
                            }`}
                        >
                            User Settings
                        </div>
                        <li>
                            <DropdownMenu
                                label="Settings"
                                icon={cilSettings}
                                items={[
                                    {
                                        href: "/profile",
                                        label: "Profile",
                                        icon: cilUserFemale,
                                        active: currentPage === "Profile",
                                        onClick: (e) => e.preventDefault(), // Prevent redirection
                                    },
                                    {
                                        href: "/account",
                                        label: "Account",
                                        icon: cilWallet,
                                        active: currentPage === "Account",
                                        onClick: (e) => e.preventDefault(), // Prevent redirection
                                    },
                                ]}
                                sidebarState={sidebarState}
                                theme={theme}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            />
                        </li>
                        {/* Sidebar Footer */}
                       
                    </CSidebarNav>
                    <div className="tw-mt-auto tw-px-3 tw-py-2 tw-border-t tw-border-gray-800">
                            <button
                                className={`tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full ${sidebarState === "half" ? "tw-mx-auto" : "tw-ml-auto"} ${theme.button} tw-transition-all tw-duration-300 tw-delay-150`}
                                onClick={toggleSidebarLock}
                            >
                                <CIcon icon={cilLockLocked} className={`${isSidebarLocked ? "tw-text-red-500" : ""}`} />
                            </button>
                        </div>
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