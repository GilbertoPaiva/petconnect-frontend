import { BaseEntity } from '../types';

export interface Lojista extends BaseEntity {
  userId: string;
  nome: string;
  cnpj: string;
  location?: string;
  contactNumber?: string;
  storeType?: string;
}

export interface Veterinario extends BaseEntity {
  userId: string;
  nome: string;
  crmv: string;
  location?: string;
  contactNumber?: string;
  businessHours?: string;
}

export interface Tutor extends BaseEntity {
  userId: string;
  nome: string;
  cnpj?: string;
  location?: string;
  contactNumber?: string;
  guardian?: string;
}
