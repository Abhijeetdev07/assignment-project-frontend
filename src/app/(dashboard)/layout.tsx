'use client';

import * as React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';

const DRAWER_WIDTH = 280;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header onMenuClick={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />

            <Sidebar
                open={mobileOpen}
                onClose={handleDrawerToggle}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                }}
            >
                {/* Toolbar spacer to push content below the fixed AppBar */}
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
