'use client';

import * as React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
// import Grid from '@mui/material/Grid2'; // Removed invalid import
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';
import { useProductStore } from '@/store/useProductStore';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const { total: totalUsers, fetchUsers, isLoading: loadingUsers } = useUserStore();
    const { total: totalProducts, fetchProducts, isLoading: loadingProducts } = useProductStore();

    React.useEffect(() => {
        // Fetch initial data to get totals if not already populated
        if (totalUsers === 0) fetchUsers(0, 1);
        if (totalProducts === 0) fetchProducts(0, 1);
    }, [totalUsers, totalProducts, fetchUsers, fetchProducts]);

    return (
        <Box>
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }, lineHeight: 1.2 }}
                >
                    Hello, {user?.firstName || 'Admin'} 👋
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                    Here is what's happening with your store today.
                </Typography>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
                {/* Users Stats Card */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                        sx={{
                            height: '100%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight="medium"
                                        sx={{ opacity: 0.9, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                                    >
                                        Total Users
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        sx={{ mt: { xs: 1.5, sm: 2 }, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.1 }}
                                    >
                                        {loadingUsers && totalUsers === 0 ? <Skeleton width={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> : totalUsers}
                                    </Typography>
                                </Box>
                                <PeopleIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.3 }} />
                            </Box>
                            <Button
                                component={Link}
                                href="/users"
                                variant="outlined"
                                sx={{
                                    mt: { xs: 2, sm: 3 },
                                    py: { xs: 0.75, sm: 1 },
                                    fontSize: { xs: '0.875rem', sm: '0.95rem' },
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                }}
                            >
                                View Users
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Products Stats Card */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                        sx={{
                            height: '100%',
                            background: 'linear-gradient(135deg, #13f1fc 0%, #0470dc 100%)', // Blue/Cyan gradient
                            color: 'white',
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight="medium"
                                        sx={{ opacity: 0.9, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                                    >
                                        Total Products
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        sx={{ mt: { xs: 1.5, sm: 2 }, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.1 }}
                                    >
                                        {loadingProducts && totalProducts === 0 ? <Skeleton width={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> : totalProducts}
                                    </Typography>
                                </Box>
                                <ShoppingBagIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.3 }} />
                            </Box>
                            <Button
                                component={Link}
                                href="/products"
                                variant="outlined"
                                sx={{
                                    mt: { xs: 2, sm: 3 },
                                    py: { xs: 0.75, sm: 1 },
                                    fontSize: { xs: '0.875rem', sm: '0.95rem' },
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                }}
                            >
                                View Products
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
