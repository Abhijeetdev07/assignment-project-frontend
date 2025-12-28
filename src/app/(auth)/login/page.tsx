'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
// import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
    const router = useRouter();
    // We can use local state for form control to keep it simple and responsive
    const [username, setUsername] = React.useState('emilys'); // Default for easier testing
    const [password, setPassword] = React.useState('emilyspass'); // Default for easier testing
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    // Optional: Sync with Zustand if desired, but for Login page local state is often sufficient
    // until we have a session.
    // const setAuthUser = useAuthStore((state) => state.login); 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // We use NextAuth's signIn to set the session cookie for middleware protection
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials. Please try again.');
                setIsLoading(false);
            } else {
                // Success: Redirect to dashboard
                router.push('/');
                router.refresh(); // Ensure the session update propagates
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            setIsLoading(false);
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Subtle gradient
                p: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Glassmorphism-ish shadow
                    borderRadius: 4,
                    padding: 1,
                }}
            >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 4, pb: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to manage users and products
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            autoFocus
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 2,
                            }}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="caption" color="text.disabled">
                            Demo Credentials: emilys / emilyspass
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
