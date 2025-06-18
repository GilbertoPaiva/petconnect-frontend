// Tipos de usuário
export enum UserType {
  ADMIN = 'ADMIN',
  LOJISTA = 'LOJISTA',
  TUTOR = 'TUTOR',
  VETERINARIO = 'VETERINARIO',
}

// Tipo de loja
export enum StoreType {
  PET_SHOP = 'PET_SHOP',
  CLINICA_VETERINARIA = 'CLINICA_VETERINARIA',
  HOSPITAL_VETERINARIO = 'HOSPITAL_VETERINARIO',
  PETISCO = 'PETISCO',
  ACESSORIOS = 'ACESSORIOS',
}

// Interfaces base
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Interface de resposta da API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

// Interface de paginação
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Alias para PageResponse
export type PageResponse<T> = Page<T>;

// Interface de erro
export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}

// ========== USER INTERFACES ==========

export interface UserProfile {
  nome?: string;
  location?: string;
  contactNumber?: string;
  cnpj?: string;
  crmv?: string;
  storeType?: StoreType;
  businessHours?: string;
  guardian?: string;
}

export interface SecurityQuestions {
  question1: string;
  answer1: string;
  question2: string;
  answer2: string;
  question3: string;
  answer3: string;
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  fullName: string;
  userType: UserType;
  active: boolean;
  userProfile?: UserProfile;
  securityQuestions?: SecurityQuestions;
}

export interface UserResponse extends BaseEntity {
  username: string;
  email: string;
  fullName: string;
  userType: UserType;
  active: boolean;
  nome?: string;
  location?: string;
  contactNumber?: string;
  cnpj?: string;
  crmv?: string;
  storeType?: StoreType;
  businessHours?: string;
  guardian?: string;
}

// ========== AUTHENTICATION INTERFACES ==========

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  userType: UserType;
  // Security Questions
  securityQuestion1: string;
  securityAnswer1: string;
  securityQuestion2: string;
  securityAnswer2: string;
  securityQuestion3: string;
  securityAnswer3: string;
  // User Profile
  nome?: string;
  location?: string;
  contactNumber?: string;
  cnpj?: string;
  crmv?: string;
  storeType?: StoreType;
  businessHours?: string;
  guardian?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    userType: UserType;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    nome?: string;
    location?: string;
    contactNumber?: string;
    cnpj?: string;
    crmv?: string;
    storeType?: StoreType;
    businessHours?: string;
    guardian?: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// ========== PRODUTO INTERFACES ==========

export interface Produto extends BaseEntity {
  lojistaId: string;
  nome: string;
  description: string;
  price: number;
  photoUrl?: string;
  unitOfMeasure: string;
}

export interface CreateProdutoRequest {
  lojistaId: string;
  nome: string;
  description: string;
  price: number;
  photoUrl?: string;
  unitOfMeasure: string;
}

export interface ProdutoResponse extends BaseEntity {
  lojistaId: string;
  nome: string;
  description: string;
  price: number;
  photoUrl?: string;
  unitOfMeasure: string;
}

// ========== SERVICO INTERFACES ==========

export interface Servico extends BaseEntity {
  veterinarioId: string;
  nome: string;
  description: string;
  price: number;
}

export interface CreateServicoRequest {
  veterinarioId: string;
  nome: string;
  description: string;
  price: number;
}

export interface ServicoResponse extends BaseEntity {
  veterinarioId: string;
  nome: string;
  description: string;
  price: number;
}

// ========== DASHBOARD INTERFACES ==========

export interface DashboardData {
  produtos?: PageResponse<Produto>;
  servicos?: PageResponse<Servico>;
  totalProdutos?: number;
  totalServicos?: number;
}

export interface AdminDashboardData {
  userCounts: {
    ADMIN: number;
    LOJISTA: number;
    TUTOR: number;
    VETERINARIO: number;
  };
  totalUsers: number;
}

// ========== SECURITY INTERFACES ==========

export interface SecurityAuditLog extends BaseEntity {
  eventType: string;
  eventDescription: string;
  userIdentifier?: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  eventTimestamp: string;
  additionalData?: string;
}

export interface SecurityStats {
  totalEvents24h: number;
  totalEventsWeek: number;
  failedLogins24h: number;
  securityViolations24h: number;
  eventTypeCount: Record<string, number>;
  topIpAddresses: Record<string, number>;
}
