import { BaseEntity } from '../types';

export interface Produto extends BaseEntity {
  lojistaId: string;
  nome: string;
  description: string;
  price: number;
  photoUrl?: string;
  unitOfMeasure: string;
}

export interface CreateProdutoRequest {
  nome: string;
  description: string;
  price: number;
  photoUrl?: string;
  unitOfMeasure: string;
  lojistaId: string;
}
