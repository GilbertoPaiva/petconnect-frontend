import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas que não precisam de autenticação
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  
  // Rotas protegidas por tipo de usuário
  const protectedRoutes = {
    admin: ['/admin'],
    veterinario: ['/veterinario'],
    lojista: ['/lojista'],
    tutor: ['/tutor']
  };

  // Se é uma rota pública, permite acesso
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verifica se há token no localStorage (só funciona no client)
  // Este middleware principalmente serve para redirecionamento inicial
  const token = request.cookies.get('pet-connect-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Se não há token e está tentando acessar rota protegida
  if (!token && Object.values(protectedRoutes).flat().some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
