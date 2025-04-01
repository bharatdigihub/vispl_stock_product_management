import React from "react";
import GlobalLayout from '../../Layouts/GlobalLayout';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { useTheme } from '../../Contexts/ThemeContext';

const Dashboard = () => {
    const { theme } = useTheme();
    return (
        <GlobalLayout>
            <CCard className={`${theme.background} ${theme.text}`}>
                <CCardHeader>Dashboard</CCardHeader>
                <CCardBody>Welcome to the dashboard!</CCardBody>
            </CCard>
        </GlobalLayout>
    );
};

export default Dashboard;
