import React, { useEffect, useRef } from "react";
import GlobalLayout from '../../Layouts/GlobalLayout';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import { useTheme } from '../../Contexts/ThemeContext';

const Dashboard = () => {
    const { theme } = useTheme();
    const cardStyle = {
        height: '150px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
    }; // Consistent height and relative positioning for canvas
    const contentStyle = {
        position: 'relative',
        zIndex: 1,
    }; // Content styling to appear above canvas

    const drawCanvas = (canvas, type) => {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;

            if (type === 'circle') {
                ctx.beginPath();
                ctx.arc(50, 50, 40, 0, 2 * Math.PI);
                ctx.stroke();
            } else if (type === 'rect') {
                ctx.strokeRect(10, 10, 80, 80);
            } else if (type === 'polyline') {
                ctx.beginPath();
                ctx.moveTo(10, 90);
                ctx.lineTo(40, 50);
                ctx.lineTo(70, 70);
                ctx.lineTo(90, 30);
                ctx.stroke();
            } else if (type === 'line') {
                ctx.beginPath();
                ctx.moveTo(10, 90);
                ctx.lineTo(90, 10);
                ctx.stroke();
            }
        }
    };

    const CanvasBackground = ({ type }) => {
        const canvasRef = useRef(null);

        useEffect(() => {
            drawCanvas(canvasRef.current, type);
        }, [type]);

        return <canvas ref={canvasRef} width="100" height="100" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.2, zIndex: 0 }} />;
    };

    return (
        <GlobalLayout>
            <CCard className={` tw-shadow-lg tw-overflow-hidden ${theme.background} ${theme.border} ${theme.text}`}>
                <CCardHeader className={`tw-bg-gray-100 ${theme.header} ${theme.border}`}>Dashboard</CCardHeader>
                <CCardBody className={`tw-bg-gray-50 ${theme.background}`}>
                    Welcome to the dashboard!
                    <CRow className="mt-4">
                        <CCol sm="6" lg="3">
                            <CCard className="bg-primary text-white" style={cardStyle}>
                                <CanvasBackground type="circle" />
                                <CCardBody style={contentStyle}>
                                    <h4 className="tw-text-2xl tw-font-bold">26K <sup className="tw-text-xs tw-relative -tw-top-2">(-12.4%)</sup></h4>
                                    <p>Users</p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm="6" lg="3">
                            <CCard className="bg-success text-white" style={cardStyle}>
                                <CanvasBackground type="rect" />
                                <CCardBody style={contentStyle}>
                                    <h4 className="tw-text-2xl tw-font-bold">$6.200 <sup className="tw-text-xs tw-relative -tw-top-2">(40.9%)</sup></h4>
                                    <p>Income</p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm="6" lg="3">
                            <CCard className="bg-warning text-white" style={cardStyle}>
                                <CanvasBackground type="polyline" />
                                <CCardBody style={contentStyle}>
                                    <h4 className="tw-text-2xl tw-font-bold">2.49% <sup className="tw-text-xs tw-relative -tw-top-2">(84.7%)</sup></h4>
                                    <p>Conversion Rate</p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm="6" lg="3">
                            <CCard className="bg-danger text-white" style={cardStyle}>
                                <CanvasBackground type="line" />
                                <CCardBody style={contentStyle}>
                                    <h4 className="tw-text-2xl tw-font-bold">44K <sup className="tw-text-xs tw-relative -tw-top-2">(-23.6%)</sup></h4>
                                    <p>Sessions</p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </GlobalLayout>
    );
};

export default Dashboard;
