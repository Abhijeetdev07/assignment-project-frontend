'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';

const DRAWER_WIDTH = 280;

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    window?: () => Window;
}

const MENU_ITEMS = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Products', icon: <ShoppingBagIcon />, path: '/products' },
];

export default function Sidebar({ open, onClose, window }: SidebarProps) {
    const pathname = usePathname();
    const container = window !== undefined ? () => window().document.body : undefined;

    const content = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Admin Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List component="nav" sx={{ px: 2, mt: 2 }}>
                {MENU_ITEMS.map((item) => {
                    // Highlight active link if pathname starts with the item's path (exact match for root)
                    const isActive = item.path === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.path);

                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={isActive}
                                onClick={onClose} // Close drawer on mobile when clicking a link
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.light', // Or use alpha if simpler
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'inherit' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Mobile Drawer (Temporary) */}
            <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
            >
                {content}
            </Drawer>

            {/* Desktop Drawer (Permanent) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: '1px solid #e2e8f0' },
                }}
                open
            >
                {content}
            </Drawer>
        </Box>
    );
}
