import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/domain/types';
import { authService } from '@/infrastructure/api/services';
import { STORAGE_KEYS } from '@/shared/constants/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (loginData: LoginRequest) => Promise<void>;
  register: (registerData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (loginData: LoginRequest) => {
        try {
          set({ isLoading: true });
          const response: AuthResponse = await authService.login(loginData);
          
          set({
            user: response.user as User,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (registerData: RegisterRequest) => {
        try {
          set({ isLoading: true });
          const response: AuthResponse = await authService.register(registerData);
          
          set({
            user: response.user as User,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem('refreshToken');
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      refreshToken: async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response: AuthResponse = await authService.refreshToken(refreshToken);
          
          set({
            user: response.user as User,
            token: response.accessToken,
            isAuthenticated: true,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error) {
          // Se falhar, fazer logout
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
