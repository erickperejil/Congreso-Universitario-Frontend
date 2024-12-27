/* import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value;

    // Define las rutas públicas (que no requieren autenticación)
    const publicRoutes = ['/login', '/register'];

    // Si la ruta es pública, permite el acceso
    if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Si no hay token, redirige al login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Decodificar el token sin verificar la firma
        const decoded: any = jwt.decode(token);

        // Verificar expiración del token
        if (decoded?.exp && decoded.exp < Date.now() / 1000) {
            // Si el token ha expirado, redirige al login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (error) {
        // Si la decodificación falla, redirige al login
        console.error('Invalid token:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Si el token es válido y no ha expirado, permite continuar
    return NextResponse.next();
}

// Configura el middleware para aplicarlo a todas las rutas
export const config = {
    matcher: ['/((?!api|_next|public/|login|register).*)'], // Excluye api, _next, public/, login y register
};
 */