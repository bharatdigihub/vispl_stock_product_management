import React, { useState, useEffect } from "react";
import Header from "./Header";
import { CSidebar, CSidebarNav, CContainer, CCol } from "@coreui/react";
import { cilSpeedometer, cilUser, cilSettings, cilLockLocked, cilUserFemale, cilWallet, cilChevronLeft, cilChevronRight, cilX, cilNotes, cilLayers, cilResizeBoth, cilColorFill, cilRecycle } from "@coreui/icons"; // Add new icons
import CIcon from "@coreui/icons-react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import NavLink, { DropdownMenu } from "../Components/NavLink";
import { useSidebar } from '../Contexts/SidebarContext'; // Import SidebarContext

const GlobalLayout = ({ children }) => {
    const { sidebarState, setSidebarState, toggleSidebar, toggleSidebarLock, isSidebarLocked, isMobileView, closeSidebar } = useSidebar();
    const { theme } = useTheme(); // Use ThemeContext
    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        // Set the initial page name based on the current URL path
        const pathToPageName = {
            "/dashboard": "Dashboard",
            "/users": "User Management",
            "/roles": "Roles",
            "/permissions": "Permissions",
            "/users/create": "Create User",
            "/users/{}/edit": "Edit User",
            "/color": "Color",
            "/unit" : "Unit",
            "/unit/create": "Create Unit",
            "/unit/{}/edit": "Edit Unit",
            "/gsm": "Gsm",
            "/gsm/create": "Create Gsm",
            "/gsm/{}/edit": "Edit Gsm",
           
        };
        const currentPath = window.location.pathname;
        setCurrentPage(pathToPageName[currentPath] || "Admin Panel");
 
        // Add a resize listener to detect mobile view
        const handleResize = () => {
            const isMobile = window.innerWidth <= 991;
            if (!isMobile && sidebarState === "closed") {
                setSidebarState("full"); // Reset sidebar to full for desktop view
            }
        };

        handleResize(); // Check on initial load
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [sidebarState, setSidebarState]);

    const handleMenuItemClick = (pageName) => {
        setCurrentPage(pageName);
        closeSidebar(); // Close the sidebar after redirection
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
        <div className={`tw-d-flex tw-flex-column tw-overflow-x-hidden ${theme.background} ${theme.text}`}>
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
                        <div
                            className={`tw-text-sm mb-2 tw-font-bold tw-uppercase tw-text-gray-400 tw-px-3 tw-py-2 ${
                                sidebarState === "half" ? "tw-hidden" : "tw-transition-all tw-duration-300 tw-delay-150"
                            }`}
                        >
                            Lists
                        </div>
                        <li>
                            <NavLink
                                href="/color"
                                icon={cilColorFill}
                                active={currentPage === "Color"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Color")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Color
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/gsm"
                                icon={cilNotes}
                                active={currentPage === "Gsm"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Gsm")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                GSM List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/unit"
                                icon={cilLayers}
                                active={currentPage === "Unit"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Unit")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Unit List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/size"
                                icon={cilResizeBoth}
                                active={currentPage === "Size"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Size")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Size List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/sewer"
                                icon={cilRecycle}
                                active={currentPage === "Sewer"}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={() => handleMenuItemClick("Sewer")}
                                className="tw-transition-all tw-duration-300 tw-delay-150"
                            >
                                Sewer List
                            </NavLink>
                        </li>

                        
                         
                      
                        

                        {/* Sidebar Footer */}
                       
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