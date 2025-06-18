import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/domain/types';
import { authService } from '@/infrastructure/api/services';
import { STORAGE_KEYS } from '@/shared/constants/api';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (loginData: LoginRequest) => Promise<void>;
  register: (registerData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  refreshAuthToken: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (loginData: LoginRequest) => {
        try {
          set({ isLoading: true });
          console.log('Tentando fazer login...', { email: loginData.email });
          
          const response: AuthResponse = await authService.login(loginData);
          console.log('Login bem-sucedido:', response);
          
          set({
            user: response.user as User,
            token: response.accessToken,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error: any) {
          console.error('Erro no login:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (registerData: RegisterRequest) => {
        try {
          set({ isLoading: true });
          console.log('Tentando fazer registro...', { email: registerData.email });
          
          const response: AuthResponse = await authService.register(registerData);
          console.log('Registro bem-sucedido:', response);
          
          set({
            user: response.user as User,
            token: response.accessToken,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error: any) {
          console.error('Erro no registro:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
        
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem('refreshToken');
        
        // Redirecionar para a página de login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
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

      refreshAuthToken: async () => {
        try {
          const { refreshToken: currentRefreshToken } = get();
          if (!currentRefreshToken) {
            throw new Error('No refresh token available');
          }

          const response: AuthResponse = await authService.refreshToken(currentRefreshToken);
          
          set({
            user: response.user as User,
            token: response.accessToken,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
          });

          localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error) {
          console.error('Erro ao renovar token:', error);
          // Se falhar, fazer logout
          get().logout();
          throw error;
        }
      },

      initializeAuth: () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
          const refreshToken = localStorage.getItem('refreshToken');
          
          if (token && refreshToken) {
            set({
              token,
              refreshToken,
              isAuthenticated: true,
            });
          }
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Inicializar auth state do localStorage na inicialização
if (typeof window !== 'undefined') {
  useAuthStore.getState().initializeAuth();
}
