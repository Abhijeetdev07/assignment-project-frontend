'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    Grid,
    Rating,
    Chip,
    Divider,
    CircularProgress,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useProductStore } from '@/store/useProductStore';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { selectedProduct, fetchProductById, isLoading } = useProductStore();
    const id = params.id as string;

    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    React.useEffect(() => {
        if (id) {
            fetchProductById(parseInt(id, 10));
        }
    }, [id, fetchProductById]);

    // Reset active image when product changes
    React.useEffect(() => {
        setActiveImageIndex(0);
    }, [selectedProduct]);

    if (isLoading || !selectedProduct) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const images = selectedProduct.images || [selectedProduct.thumbnail];

    const handleNextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
                sx={{ mb: 3 }}
            >
                Back to Products
            </Button>

            <Grid container spacing={4}>
                {/* Left: Image Gallery */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            paddingTop: '75%', // 4:3 Aspect Ratio
                            bgcolor: '#f3f4f6',
                            borderRadius: 3,
                            overflow: 'hidden',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Main Image */}
                        <Box
                            component="img"
                            src={images[activeImageIndex]}
                            alt={selectedProduct.title}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                p: 2
                            }}
                        />

                        {/* Navigation Arrows (only if multiple images) */}
                        {images.length > 1 && (
                            <>
                                <IconButton
                                    onClick={handlePrevImage}
                                    sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'white' } }}
                                >
                                    <ArrowBackIosIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={handleNextImage}
                                    sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'white' } }}
                                >
                                    <ArrowForwardIosIcon fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </Box>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', py: 1 }}>
                            {images.map((img, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setActiveImageIndex(index)}
                                    component="img"
                                    src={img}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        border: index === activeImageIndex ? '2px solid #4F46E5' : '2px solid transparent',
                                        bgcolor: '#f9fafb',
                                        objectFit: 'contain',
                                        p: 0.5
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Grid>

                {/* Right: Product Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="h4" fontWeight="bold">
                                {selectedProduct.title}
                            </Typography>
                            <Chip
                                label={selectedProduct.brand}
                                size="small"
                                sx={{ ml: 2, bgcolor: 'primary.light', color: 'white' }}
                            />
                        </Box>

                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {selectedProduct.category}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <Rating value={selectedProduct.rating} readOnly precision={0.5} />
                            <Typography variant="body2" color="text.secondary">
                                ({selectedProduct.rating} / 5)
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Typography variant="h3" fontWeight="bold" color="primary">
                                ${selectedProduct.price}
                            </Typography>
                            {selectedProduct.discountPercentage > 0 && (
                                <Chip
                                    label={`-${selectedProduct.discountPercentage}%`}
                                    color="error"
                                    variant="filled"
                                    size="small"
                                />
                            )}
                        </Box>

                        <Typography variant="body1" paragraph color="text.secondary" sx={{ flexGrow: 1 }}>
                            {selectedProduct.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', mb: 3 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                                Availability:
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={selectedProduct.stock > 0 ? 'success.main' : 'error.main'}
                                sx={{ ml: 1 }}
                            >
                                {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : 'Out of Stock'}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={<AddShoppingCartIcon />}
                            disabled={selectedProduct.stock === 0}
                            sx={{ borderRadius: 2, py: 1.5, fontSize: '1.1rem' }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
