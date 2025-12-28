'use client';

import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating, Button } from '@mui/material';
import { Product } from '@/store/useProductStore';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
            <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}> {/* 16:9 Aspect Ratio container */}
                <CardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <Chip label={`-${product.discountPercentage.toFixed(0)}%`} color="error" size="small" />
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography gutterBottom variant="subtitle1" component="div" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                        {product.title}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        ${product.price}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 1
                }}>
                    {product.description}
                </Typography>

                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={product.rating} readOnly precision={0.5} size="small" />
                    <Typography variant="caption" color="text.secondary">({product.rating})</Typography>
                </Box>

                <Button
                    component={Link}
                    href={`/products/${product.id}`}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
}
