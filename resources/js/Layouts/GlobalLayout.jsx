import React from "react";
import Header from "./Header"; // Corrected the import path
import Footer from "./Footer"; // Updated Footer path
import { Link } from "@inertiajs/react";

const GlobalLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen"> {/* Flex container */}
            <Header /> {/* Include Header */}
            <div className="flex flex-grow"> {/* Main content with sidebar */}
                <aside className="w-48 bg-gray-800 text-white p-4"> {/* Reduced Sidebar Width */}
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/users"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    User Management
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/roles"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Roles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/permissions"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Permissions
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-grow container mx-auto my-8"> {/* Main content */}
                    {children} {/* Render the page content */}
                </main>
            </div>
            <Footer /> {/* Include Footer */}
        </div>
    );
};

export default GlobalLayout;
