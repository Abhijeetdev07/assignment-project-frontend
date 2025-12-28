import { create } from 'zustand';
import api from '@/lib/api';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    categories: string[];
    total: number;
    skip: number;
    limit: number;
    isLoading: boolean;

    // Filter states
    searchTerm: string;
    selectedCategory: string;

    // Actions
    fetchProducts: (skip?: number, limit?: number) => Promise<void>;
    fetchProductById: (id: number) => Promise<void>;
    fetchCategories: () => Promise<void>;
    setSearchTerm: (term: string) => void;
    setCategory: (category: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    selectedProduct: null,
    categories: [],
    total: 0,
    skip: 0,
    limit: 10,
    isLoading: false,
    searchTerm: '',
    selectedCategory: '',

    fetchProducts: async (skip = 0, limit = 10) => {
        const { searchTerm, selectedCategory } = get();
        set({ isLoading: true });

        try {
            let url = `/products?limit=${limit}&skip=${skip}`;

            // Search takes priority, or we can handle category filtering
            // DummyJSON has specific endpoints for these.
            if (searchTerm) {
                url = `/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;
            } else if (selectedCategory) {
                url = `/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;
            }

            const response = await api.get(url);
            const data = response.data;

            set({
                products: data.products,
                total: data.total,
                skip: data.skip,
                limit: data.limit,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch products:', error);
            set({ isLoading: false });
        }
    },

    fetchCategories: async () => {
        try {
            const response = await api.get('/products/categories');
            set({ categories: response.data });
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    },

    fetchProductById: async (id: number) => {
        set({ isLoading: true, selectedProduct: null });
        try {
            const response = await api.get(`/products/${id}`);
            set({ selectedProduct: response.data, isLoading: false });
        } catch (error) {
            console.error('Failed to fetch product:', error);
            set({ isLoading: false });
        }
    },

    setSearchTerm: (term) => {
        set({ searchTerm: term, selectedCategory: '' }); // Clear category when searching
        get().fetchProducts(0, get().limit);
    },

    setCategory: (category) => {
        set({ selectedCategory: category, searchTerm: '' }); // Clear search when filtering by category
        get().fetchProducts(0, get().limit);
    },
}));
