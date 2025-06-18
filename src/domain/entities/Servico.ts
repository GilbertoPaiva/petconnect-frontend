import { BaseEntity } from '../types';

export interface Servico extends BaseEntity {
  veterinarioId: string;
  nome: string;
  description: string;
  price: number;
}

export interface CreateServicoRequest {
  nome: string;
  description: string;
  price: number;
}
