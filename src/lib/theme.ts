'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

// Using Next.js font optimization for Inter
const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4F46E5', // Indigo 600 - A modern, premium primary color
            light: '#818CF8',
            dark: '#3730A3',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#10B981', // Emerald 500 - A fresh secondary color for success/accents
            light: '#34D399',
            dark: '#059669',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F9FAFB', // Slate 50 - Softer than pure white for the background
            paper: '#FFFFFF',
        },
        text: {
            primary: '#111827', // Gray 900 - High contrast text
            secondary: '#6B7280', // Gray 500 - Muted text
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h3: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.025em',
        },
    },
    shape: {
        borderRadius: 8, // Slightly softer rounded corners
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Remove uppercase transform for a modern look
                    borderRadius: '8px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Subtle shadow on hover
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#4338CA', // Indigo 700
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove default standard elevation gradient in dark mode if we switch
                },
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Tailwind-like shadow
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px', // Cards look better with more rounded corners
                    border: '1px solid #E5E7EB', // Subtle border
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
});

export default theme;
