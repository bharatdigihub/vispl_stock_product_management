import React from "react";
import GlobalLayout from "../Layouts/GlobalLayout"; // Import GlobalLayout

const Dashboard = () => {
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
        </GlobalLayout>
    );
};

export default Dashboard;
