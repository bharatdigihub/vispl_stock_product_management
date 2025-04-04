import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@inertiajs/react";
import { CSidebar, CSidebarNav, CContainer, CCol } from "@coreui/react";
import { cilSpeedometer, cilUser, cilSettings, cilLockLocked, cilUserFemale, cilWallet, cilChevronLeft, cilChevronRight, cilX } from "@coreui/icons"; // Add new icons
import CIcon from "@coreui/icons-react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import NavLink, { DropdownMenu } from "../Components/NavLink";

const GlobalLayout = ({ children }) => {
    const { theme } = useTheme(); // Use ThemeContext
    const [sidebarState, setSidebarState] = useState("closed"); // Initially closed
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
            const isMobile = window.innerWidth <= 991;
            setIsMobileView(isMobile);

            if (!isMobile) {
                // Ensure sidebar is not hidden for larger screens
                if (sidebarState === "closed" && !isSidebarLocked) {
                    setSidebarState("full"); // Reset sidebar to full for desktop view
                }
            }
        };

        handleResize(); // Check on initial load
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [sidebarState, isSidebarLocked]);

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
            setSidebarState("half"); // Keep the sidebar locked to "half" on larger screens
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
        <div className={`tw-d-flex tw-flex-column  tw-overflow-x-hidden ${theme.background} ${theme.text}`}>
            <div className="tw-d-flex tw-min-h-screen tw-flex-grow-1 tw-relative">
                {/* Sidebar */}
                <CSidebar
                    visible={sidebarState !== "closed"}
                    onMouseEnter={isSidebarLocked ? handleMouseEnter : undefined}
                    onMouseLeave={isSidebarLocked ? handleMouseLeave : undefined}
                    className={`
                        ${theme.sidebar} tw-text-white tw-h-screen Sidebar background
                        tw-transition-all tw-fixed tw-top-0 tw-bottom-0 tw-left-0  tw-min-h-screen ${
                        sidebarState === "full" ? "sidebar-full" : sidebarState === "half" ? "sidebar-half" : "sidebar-closed"
                    }`}
                >
                    <div className={`tw-text-center tw-h-[59px] tw-font-bold  tw-flex tw-justify-between px-3 lg:tw-justify-center tw-items-center  tw-text-gray-50 ${sidebarState === "full" ? "tw-tracking-widest tw-text-2xl" : "tw-tracking-normal tw-text-lg"}`}>
                        {sidebarState === "full" ? "VSIPL" : "VSL"}
                        {isMobileView && (
                            <button
                                onClick={() => setSidebarState("closed")}
                                className={`tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-ml-2 tw-border ${theme.button} ${theme.border.sidebarInner}`}
                            >
                                <CIcon icon={cilX} width={14} /> {/* Use CoreUI React icon */}
                            </button>
                        )}
                    </div>
                    <CSidebarNav className={`tw-border-t tw-border-b ${theme.border.sidebarInner}`}>
                        <div
                            className={`tw-text-sm mb-2 tw-font-bold tw-uppercase tw-text-gray-400 tw-px-3 tw-py-2 ${
                                isMobileView || sidebarState === "half" ? "tw-hidden" : "tw-transition-all tw-duration-300 tw-delay-150"
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
                    </CSidebarNav>
                    <div className="tw-mt-auto tw-hidden lg:tw-flex tw-px-3 tw-py-2 tw-h-12 lg:tw-w-flex tw-items-center">
                        <button
                            className={`tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center group tw-rounded-full hover:tw-bg-gray-900 ${sidebarState === "half" ? "tw-mx-auto" : "tw-ml-auto"} tw-border ${theme.border.sidebarInner} tw-transition-all tw-duration-300 tw-delay-150`}
                            onClick={toggleSidebarLock}
                        >
                            <CIcon icon={sidebarState === 'half' ? cilChevronRight : cilChevronLeft} width={13} className={`tw-text-gray-400 group-hover:tw-text-gray-50 ${isSidebarLocked ? "tw-text-red-500" : ""}`} />
                        </button>
                    </div>
                </CSidebar>

                {/* Main Content */}
                <CContainer
                    fluid
                    className={`tw-max-w-full tw-px-0 tw-transition-all tw-min-vh-100 ${theme.background} ${theme.text}  content-${sidebarState}`}
                >
                    <Header 
                        toggleSidebar={toggleSidebar} 
                        sidebarState={sidebarState} 
                        currentPage={currentPage} 
                        className={`head-${sidebarState}`}
                    />
                    <CCol className={`main-${sidebarState} tw-transition-all`}>
                        <div className="tw-max-w-7xl tw-mx-auto ">{children}</div>
                    </CCol>
                </CContainer>
            </div>
        </div>
    );
};

export default GlobalLayout;