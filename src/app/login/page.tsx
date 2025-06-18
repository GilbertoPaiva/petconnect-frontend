'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/application/stores/useAuthStore';
import { UserType } from '@/domain/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      
      // Aguardar um tick para o store ser atualizado
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          // Redirecionar baseado no tipo de usuário
          switch (currentUser.userType) {
            case UserType.ADMIN:
              router.push('/admin/dashboard');
              break;
            case UserType.VETERINARIO:
              router.push('/veterinario/dashboard');
              break;
            case UserType.LOJISTA:
              router.push('/lojista/dashboard');
              break;
            case UserType.TUTOR:
            default:
              router.push('/tutor/dashboard');
              break;
          }
        } else {
          // Fallback para tutor se não conseguir identificar o tipo
          router.push('/tutor/dashboard');
        }
      }, 100);
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Pet Connect</span>
          </Link>
          <p className="text-gray-600 mt-2">Entre em sua conta</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo de volta!</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
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
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Lembrar de mim
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>

            {/* Para fins de teste - pode ser removido em produção */}
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-xs text-blue-600 font-medium mb-2">Contas de teste:</p>
              <div className="text-xs text-blue-600 space-y-1">
                <div>Admin: admin@test.com / 123456</div>
                <div>Veterinário: vet@test.com / 123456</div>
                <div>Lojista: loja@test.com / 123456</div>
                <div>Tutor: tutor@test.com / 123456</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
