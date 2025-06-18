export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  
  // Users
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  
  // Admin
  ADMIN_DASHBOARD: '/api/admin/dashboard',
  ADMIN_USERS: '/api/admin/users',
  ADMIN_USER_TOGGLE: (id: string) => `/api/admin/users/${id}/toggle-status`,
  
  // Lojista/Produtos
  PRODUTOS: '/api/produtos',
  PRODUTOS_BY_LOJISTA: (lojistaId: string) => `/api/produtos/lojista/${lojistaId}`,
  PRODUTO_BY_ID: (id: string) => `/api/produtos/${id}`,
  
  // Veterinario/Serviços
  VETERINARIO_DASHBOARD: (veterinarioId: string) => `/api/veterinario/dashboard/${veterinarioId}`,
  VETERINARIO_SERVICOS: (veterinarioId: string) => `/api/veterinario/${veterinarioId}/servicos`,
  VETERINARIO_SERVICO_BY_ID: (veterinarioId: string, servicoId: string) => 
    `/api/veterinario/${veterinarioId}/servicos/${servicoId}`,
  
  // Tutor
  TUTOR_DASHBOARD: '/api/tutor/dashboard',
  TUTOR_PRODUTOS: '/api/tutor/produtos',
  TUTOR_SERVICOS: '/api/tutor/servicos',
} as const;

export const STORAGE_KEYS = {
  USER: 'pet-connect-user',
  TOKEN: 'pet-connect-token',
  THEME: 'pet-connect-theme',
} as const;
