'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/application/stores/useAuthStore';
import { UserType } from '@/domain/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: UserType[];
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedUserTypes = [], 
  requireAuth = true 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Inicializar auth se necessário
    initializeAuth();
    
    // Aguardar um pouco para o estado ser carregado
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [initializeAuth]);

  useEffect(() => {
    if (!isChecking && !isLoading) {
      // Se requer autenticação e não está autenticado
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
        return;
      }

      // Se está autenticado mas não tem o tipo de usuário permitido
      if (isAuthenticated && user && allowedUserTypes.length > 0) {
        if (!allowedUserTypes.includes(user.userType)) {
          // Redirecionar para o dashboard correto do usuário
          switch (user.userType) {
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
          return;
        }
      }
    }
  }, [isChecking, isLoading, isAuthenticated, user, allowedUserTypes, requireAuth, router]);

  // Mostrar loading enquanto verifica
  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se requer auth mas não está autenticado, não renderizar nada (será redirecionado)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Se tem restrição de tipo de usuário e não atende, não renderizar nada (será redirecionado)
  if (isAuthenticated && user && allowedUserTypes.length > 0 && !allowedUserTypes.includes(user.userType)) {
    return null;
  }

  return <>{children}</>;
}
