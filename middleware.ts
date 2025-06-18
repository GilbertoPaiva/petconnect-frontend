import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas que não precisam de autenticação
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  
  // Verificar se é uma rota pública
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Para rotas protegidas, verificar se há token no header ou cookies
  const token = request.headers.get('authorization') || 
                request.cookies.get('auth-storage')?.value;

  // Se não há token, redirecionar para login
  if (!token && pathname.startsWith('/admin') || 
      pathname.startsWith('/tutor') || 
      pathname.startsWith('/veterinario') || 
      pathname.startsWith('/lojista')) {
    
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
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
