import { create } from 'zustand';
import api from '@/lib/api';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    company: {
        title: string;
        department: string;
    };
    image: string;
    // Add other fields as needed from DummyJSON
}

interface UserState {
    users: User[];
    selectedUser: User | null;
    total: number;
    skip: number;
    limit: number;
    isLoading: boolean;
    searchTerm: string;

    // Actions
    fetchUsers: (skip?: number, limit?: number) => Promise<void>;
    fetchUserById: (id: number) => Promise<void>;
    setSearchTerm: (term: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    selectedUser: null,
    total: 0,
    skip: 0,
    limit: 10, // Default limit
    isLoading: false,
    searchTerm: '',

    fetchUsers: async (skip = 0, limit = 10) => {
        const { searchTerm } = get();
        set({ isLoading: true });

        try {
            let url = `/users?limit=${limit}&skip=${skip}`;

            // If there's a search term, we use the search endpoint
            // Note: DummyJSON search doesn't support advanced pagination in the same way sometimes,
            // but usually follows the same structure.
            if (searchTerm) {
                url = `/users/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;
            }

            const response = await api.get(url);
            const data = response.data;

            set({
                users: data.users,
                total: data.total,
                skip: data.skip,
                limit: data.limit,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch users:', error);
            set({ isLoading: false });
        }
    },

    fetchUserById: async (id: number) => {
        set({ isLoading: true, selectedUser: null });
        try {
            // Check if user is already in the list to save a request (optional, but good for UX)
            // const existingUser = get().users.find(u => u.id === id);
            // if (existingUser) {
            //     set({ selectedUser: existingUser, isLoading: false });
            //     return;
            // }

            const response = await api.get(`/users/${id}`);
            set({ selectedUser: response.data, isLoading: false });
        } catch (error) {
            console.error('Failed to fetch user:', error);
            set({ isLoading: false });
        }
    },

    setSearchTerm: (term) => {
        set({ searchTerm: term });
        // Trigger reset to first page when searching
        get().fetchUsers(0, get().limit);
    },
}));
