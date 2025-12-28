'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    CircularProgress,
    Pagination,
    SelectChangeEvent
} from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/Product/ProductCard';
import { debounce } from 'lodash';

export default function ProductsPage() {
    const {
        products,
        total,
        skip,
        limit,
        categories,
        isLoading,
        searchTerm,
        selectedCategory,
        fetchProducts,
        fetchCategories,
        setSearchTerm,
        setCategory
    } = useProductStore();

    // Initial Fetch
    React.useEffect(() => {
        fetchProducts(skip, limit);
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = React.useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
        }, 500),
        [setSearchTerm]
    );

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const newSkip = (value - 1) * limit;
        fetchProducts(newSkip, limit);
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Products
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 3 }}>
                    <TextField
                        placeholder="Search products..."
                        defaultValue={searchTerm}
                        onChange={onSearchChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                    />

                    <FormControl sx={{ minWidth: 200, bgcolor: 'background.paper', borderRadius: 1 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="">
                                <em>All Categories</em>
                            </MenuItem>
                            {categories.map((cat: any) => {
                                // DummyJSON sometimes returns objects { slug, name, url } or strings
                                const val = typeof cat === 'string' ? cat : cat.slug;
                                const label = typeof cat === 'string' ? cat : cat.name;
                                return (
                                    <MenuItem key={val} value={val}>{label}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : products.length > 0 ? (
                <>
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                        <Pagination
                            count={totalPages}
                            page={Math.floor(skip / limit) + 1}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                </>
            ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No products found.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
