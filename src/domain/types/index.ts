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

// Interface de erro
export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}
