import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto my-8">
                <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-bold">Total Users</h2>
                        <p className="text-gray-700">150</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-bold">Total Roles</h2>
                        <p className="text-gray-700">10</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-bold">Total Permissions</h2>
                        <p className="text-gray-700">25</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Dashboard;
