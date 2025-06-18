import { BaseEntity } from '../types';

export interface SecurityQuestions {
  question1?: string;
  answer1?: string;
  question2?: string;
  answer2?: string;
  question3?: string;
  answer3?: string;
}

export interface UserProfile {
  nome?: string;
  location?: string;
  contactNumber?: string;
  cnpj?: string;
  crmv?: string;
  storeType?: string;
  businessHours?: string;
  guardian?: string;
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  fullName: string;
  userType: 'ADMIN' | 'LOJISTA' | 'TUTOR' | 'VETERINARIO';
  active: boolean;
  roles: string[];
  securityQuestions?: SecurityQuestions;
  userProfile?: UserProfile;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}
