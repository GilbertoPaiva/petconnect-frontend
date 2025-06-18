'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye, EyeOff, Users, Star, Shield, Stethoscope } from 'lucide-react';
import { UserType } from '@/domain/types';

export default function RegisterPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '' as UserType | '',
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    // Campos específicos por tipo
    cnpj: '',
    crmv: '',
    location: '',
    contactNumber: '',
    storeType: '',
    businessHours: '',
    guardian: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    {
      type: UserType.TUTOR,
      title: 'Tutor',
      description: 'Sou dono de pets e busco produtos e serviços',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      type: UserType.VETERINARIO,
      title: 'Veterinário',
      description: 'Sou profissional veterinário e ofereço serviços',
      icon: Stethoscope,
      color: 'text-green-600',
    },
    {
      type: UserType.LOJISTA,
      title: 'Lojista',
      description: 'Tenho uma loja e vendo produtos pet',
      icon: Star,
      color: 'text-purple-600',
    },
    {
      type: UserType.ADMIN,
      title: 'Administrador',
      description: 'Gerencio a plataforma',
      icon: Shield,
      color: 'text-red-600',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implementar chamada real para API
      console.log('Dados do registro:', formData);
      
      // Mock de sucesso
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      router.push('/login');
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserTypeSelect = (type: UserType) => {
    setFormData(prev => ({ ...prev, userType: type }));
    setStep(2);
  };

  const renderStepOne = () => (
    <Card>
      <CardHeader>
        <CardTitle>Escolha seu tipo de conta</CardTitle>
        <CardDescription>
          Selecione a opção que melhor descreve você
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.type}
                onClick={() => handleUserTypeSelect(type.type)}
                className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-4">
                  <Icon className={`h-8 w-8 ${type.color}`} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderStepTwo = () => (
    <Card>
      <CardHeader>
        <CardTitle>Criar sua conta</CardTitle>
        <CardDescription>
          Preencha os dados para criar sua conta como {userTypes.find(t => t.type === formData.userType)?.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Dados básicos */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Seu nome completo"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nome de usuário
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="usuario123"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campos específicos por tipo */}
          {formData.userType === UserType.LOJISTA && (
            <div className="space-y-2">
              <label htmlFor="cnpj" className="text-sm font-medium text-gray-700">
                CNPJ
              </label>
              <Input
                id="cnpj"
                name="cnpj"
                type="text"
                placeholder="00.000.000/0001-00"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {formData.userType === UserType.VETERINARIO && (
            <div className="space-y-2">
              <label htmlFor="crmv" className="text-sm font-medium text-gray-700">
                CRMV
              </label>
              <Input
                id="crmv"
                name="crmv"
                type="text"
                placeholder="CRMV-SP 12345"
                value={formData.crmv}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Concordo com os{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                Política de Privacidade
              </Link>
            </label>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Pet Connect</span>
          </Link>
          <p className="text-gray-600 mt-2">Crie sua conta</p>
        </div>

        {step === 1 ? renderStepOne() : renderStepTwo()}
      </div>
    </div>
  );
}
