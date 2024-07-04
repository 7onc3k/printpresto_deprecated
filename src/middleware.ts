import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Pokud se uživatel pokouší přistoupit k /employee/login, nechme ho projít
  if (req.nextUrl.pathname === '/employee/login') {
    return res;
  }

  // Pokud uživatel není přihlášený a pokouší se přistoupit k /employee/*
  if (!session && req.nextUrl.pathname.startsWith('/employee')) {
    return NextResponse.redirect(new URL('/employee/login', req.url));
  }

  // Pokud je uživatel přihlášený, zkontrolujeme, zda je zaměstnanec
  if (session && req.nextUrl.pathname.startsWith('/employee')) {
    const { data: userData } = await supabase
      .from('users')
      .select('is_employee')
      .eq('id', session.user.id)
      .single();

    if (!userData || !userData.is_employee) {
      // Pokud uživatel není zaměstnanec, přesměrujeme ho na hlavní stránku
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/employee/:path*'],
};