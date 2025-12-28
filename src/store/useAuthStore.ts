import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            login: async (username, password) => {
                set({ isLoading: true, error: null });
                try {
                    // Hits the DummyJSON auth endpoint
                    const response = await api.post('/auth/login', {
                        username,
                        password,
                    });

                    const userData = response.data;

                    set({
                        user: userData,
                        token: userData.token,
                        isLoading: false
                    });

                } catch (err: any) {
                    const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
                    set({ error: message, isLoading: false });
                }
            },

            logout: () => {
                set({ user: null, token: null, error: null });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);
