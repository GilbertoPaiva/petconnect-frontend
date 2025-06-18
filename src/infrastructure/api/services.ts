import { apiService } from '@/infrastructure/api/ApiService';
import {
  User,
  Produto,
  Servico,
  CreateProdutoRequest,
  CreateServicoRequest,
  LoginRequest,
  RegisterRequest,
  DashboardData,
  PageResponse,
  AuthResponse,
  UserResponse,
  AdminDashboardData,
  SecurityStats,
  SecurityAuditLog
} from '@/domain/types';

// ============ AUTHENTICATION SERVICES ============

export const authService = {
  // POST /api/auth/register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiService.post<AuthResponse>('/api/auth/register', data);
  },

  // POST /api/auth/login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiService.post<AuthResponse>('/api/auth/login', data);
  },

  // GET /api/auth/forgot-password/{email}
  getSecurityQuestion: async (email: string): Promise<string> => {
    return apiService.get<string>(`/api/auth/forgot-password/${email}`);
  },

  // POST /api/auth/reset-password
  resetPassword: async (email: string, securityAnswer: string, newPassword: string): Promise<string> => {
    return apiService.post<string>('/api/auth/reset-password', null, {
      params: { email, securityAnswer, newPassword }
    });
  },

  // POST /api/auth/refresh-token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return apiService.post<AuthResponse>('/api/auth/refresh-token', { refreshToken });
  },
};

// ============ TUTOR SERVICES ============

export const tutorService = {
  // GET /api/tutor/dashboard
  getDashboard: async (page = 0, size = 10): Promise<DashboardData> => {
    return apiService.get<DashboardData>(`/api/tutor/dashboard?page=${page}&size=${size}`);
  },

  // GET /api/tutor/produtos
  getProdutos: async (page = 0, size = 10, search?: string): Promise<PageResponse<Produto>> => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (search) params.append('search', search);
    return apiService.get<PageResponse<Produto>>(`/api/tutor/produtos?${params}`);
  },

  // GET /api/tutor/servicos
  getServicos: async (page = 0, size = 10, search?: string): Promise<PageResponse<Servico>> => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (search) params.append('search', search);
    return apiService.get<PageResponse<Servico>>(`/api/tutor/servicos?${params}`);
  },
};

// ============ PRODUCT SERVICES ============

export const produtoService = {
  // POST /api/produtos
  create: async (data: CreateProdutoRequest): Promise<Produto> => {
    return apiService.post<Produto>('/api/produtos', data);
  },

  // GET /api/produtos/lojista/{id}
  getByLojista: async (lojistaId: string): Promise<Produto[]> => {
    return apiService.get<Produto[]>(`/api/produtos/lojista/${lojistaId}`);
  },

  // GET /api/produtos/{id}
  getById: async (id: string): Promise<Produto> => {
    return apiService.get<Produto>(`/api/produtos/${id}`);
  },

  // GET /api/produtos
  getAll: async (page = 0, size = 10): Promise<PageResponse<Produto>> => {
    return apiService.get<PageResponse<Produto>>(`/api/produtos?page=${page}&size=${size}`);
  },

  // PUT /api/produtos/{id}
  update: async (id: string, data: CreateProdutoRequest): Promise<Produto> => {
    return apiService.put<Produto>(`/api/produtos/${id}`, data);
  },

  // DELETE /api/produtos/{id}
  delete: async (id: string): Promise<void> => {
    return apiService.delete<void>(`/api/produtos/${id}`);
  },
};

// ============ SERVICE SERVICES ============

export const servicoService = {
  // POST /api/servicos
  create: async (data: CreateServicoRequest): Promise<Servico> => {
    return apiService.post<Servico>('/api/servicos', data);
  },

  // GET /api/servicos/veterinario/{id}
  getByVeterinario: async (veterinarioId: string): Promise<Servico[]> => {
    return apiService.get<Servico[]>(`/api/servicos/veterinario/${veterinarioId}`);
  },

  // GET /api/servicos/{id}
  getById: async (id: string): Promise<Servico> => {
    return apiService.get<Servico>(`/api/servicos/${id}`);
  },

  // GET /api/servicos
  getAll: async (page = 0, size = 10): Promise<PageResponse<Servico>> => {
    return apiService.get<PageResponse<Servico>>(`/api/servicos?page=${page}&size=${size}`);
  },

  // PUT /api/servicos/{id}
  update: async (id: string, data: CreateServicoRequest): Promise<Servico> => {
    return apiService.put<Servico>(`/api/servicos/${id}`, data);
  },

  // DELETE /api/servicos/{id}
  delete: async (id: string): Promise<void> => {
    return apiService.delete<void>(`/api/servicos/${id}`);
  },
};

// ============ VETERINARIAN SERVICES ============

export const veterinarioService = {
  // GET /api/veterinario/dashboard/{id}
  getDashboard: async (veterinarioId: string): Promise<DashboardData> => {
    return apiService.get<DashboardData>(`/api/veterinario/dashboard/${veterinarioId}`);
  },

  // POST /api/veterinario/{id}/servicos
  createServico: async (veterinarioId: string, data: CreateServicoRequest): Promise<Servico> => {
    return apiService.post<Servico>(`/api/veterinario/${veterinarioId}/servicos`, data);
  },

  // GET /api/veterinario/{id}/servicos
  getServicos: async (veterinarioId: string): Promise<Servico[]> => {
    return apiService.get<Servico[]>(`/api/veterinario/${veterinarioId}/servicos`);
  },

  // GET /api/veterinario/{id}/servicos/{servicoId}
  getServicoById: async (veterinarioId: string, servicoId: string): Promise<Servico> => {
    return apiService.get<Servico>(`/api/veterinario/${veterinarioId}/servicos/${servicoId}`);
  },

  // PUT /api/veterinario/{id}/servicos/{servicoId}
  updateServico: async (veterinarioId: string, servicoId: string, data: CreateServicoRequest): Promise<Servico> => {
    return apiService.put<Servico>(`/api/veterinario/${veterinarioId}/servicos/${servicoId}`, data);
  },

  // DELETE /api/veterinario/{id}/servicos/{servicoId}
  deleteServico: async (veterinarioId: string, servicoId: string): Promise<void> => {
    return apiService.delete<void>(`/api/veterinario/${veterinarioId}/servicos/${servicoId}`);
  },
};

// ============ ADMIN SERVICES ============

export const adminService = {
  // GET /api/admin/dashboard
  getDashboard: async (): Promise<AdminDashboardData> => {
    return apiService.get<AdminDashboardData>('/api/admin/dashboard');
  },

  // GET /api/admin/users
  getUsers: async (page = 0, size = 10, name?: string, userType?: string): Promise<PageResponse<UserResponse>> => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (name) params.append('name', name);
    if (userType) params.append('userType', userType);
    return apiService.get<PageResponse<UserResponse>>(`/api/admin/users?${params}`);
  },

  // GET /api/admin/users/{id}
  getUserDetails: async (id: string): Promise<UserResponse> => {
    return apiService.get<UserResponse>(`/api/admin/users/${id}`);
  },

  // PUT /api/admin/users/{id}/toggle-status
  toggleUserStatus: async (id: string): Promise<UserResponse> => {
    return apiService.put<UserResponse>(`/api/admin/users/${id}/toggle-status`);
  },
};

// ============ SECURITY AUDIT SERVICES (ADMIN ONLY) ============

export const securityService = {
  // GET /api/admin/security/audit-logs
  getAuditLogs: async (
    page = 0,
    size = 20,
    eventType?: string,
    userIdentifier?: string,
    ipAddress?: string
  ): Promise<PageResponse<SecurityAuditLog>> => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (eventType) params.append('eventType', eventType);
    if (userIdentifier) params.append('userIdentifier', userIdentifier);
    if (ipAddress) params.append('ipAddress', ipAddress);
    return apiService.get<PageResponse<SecurityAuditLog>>(`/api/admin/security/audit-logs?${params}`);
  },

  // GET /api/admin/security/stats
  getSecurityStats: async (): Promise<SecurityStats> => {
    return apiService.get<SecurityStats>('/api/admin/security/stats');
  },

  // GET /api/admin/security/violations
  getSecurityViolations: async (hours = 24): Promise<SecurityAuditLog[]> => {
    return apiService.get<SecurityAuditLog[]>(`/api/admin/security/violations?hours=${hours}`);
  },

  // GET /api/admin/security/user/{userIdentifier}
  getUserAuditLogs: async (userIdentifier: string, days = 7): Promise<SecurityAuditLog[]> => {
    return apiService.get<SecurityAuditLog[]>(`/api/admin/security/user/${userIdentifier}?days=${days}`);
  },
};

// ============ LOJISTA SERVICES (Missing from current implementation) ============

export const lojistaService = {
  // GET /api/lojista/dashboard/{id} - Needs to be implemented in backend
  getDashboard: async (lojistaId: string): Promise<DashboardData> => {
    return apiService.get<DashboardData>(`/api/lojista/dashboard/${lojistaId}`);
  },

  // GET /api/lojista/{id}/produtos - Using produto service for now
  getProdutos: async (lojistaId: string): Promise<Produto[]> => {
    return produtoService.getByLojista(lojistaId);
  },
};
