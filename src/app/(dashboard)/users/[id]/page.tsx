'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Avatar, Grid, Button, Divider, Chip, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import { useUserStore } from '@/store/useUserStore';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { selectedUser, fetchUserById, isLoading } = useUserStore();
    const id = params.id as string;

    React.useEffect(() => {
        if (id) {
            fetchUserById(parseInt(id, 10));
        }
    }, [id, fetchUserById]);

    if (isLoading || !selectedUser) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
                sx={{ mb: 3 }}
            >
                Back to Users
            </Button>

            <Card sx={{ maxWidth: 800, mx: 'auto', p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, mb: 4 }}>
                        <Avatar
                            src={selectedUser.image}
                            alt={selectedUser.firstName}
                            sx={{ width: 120, height: 120, border: '4px solid #f3f4f6' }}
                        />
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography variant="h4" fontWeight="bold">
                                {selectedUser.firstName} {selectedUser.lastName}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                <Chip label={selectedUser.company.title} color="primary" variant="outlined" size="small" />
                                <Chip label={selectedUser.gender} color={selectedUser.gender === 'male' ? 'info' : 'secondary'} variant="outlined" size="small" />
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <EmailIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Email</Typography>
                                    <Typography variant="body1">{selectedUser.email}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <PhoneIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Phone</Typography>
                                    <Typography variant="body1">{selectedUser.phone}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <BusinessIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Company</Typography>
                                    <Typography variant="body1">{selectedUser.company.department}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {/* Placeholder for more fields like Address if they were in the interface */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {selectedUser.id}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
