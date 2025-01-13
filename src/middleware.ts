/* import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    console.log('Middleware:', request.nextUrl.pathname);

    const token = request.cookies.get('authToken')?.value;
    console.log('Token:', token);

     // Define las rutas públicas (que no requieren autenticación)
     const publicRoutes = ['/login', '/register', '/colaborador/informacion'];

//     // Si la ruta es pública, permite el acceso
    if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next(); // Llamar como función
    }

//     // Si no hay token, redirige al login
     if (!token) {
         return NextResponse.redirect(new URL('/login', request.url));
     }

    try {
        // Decodificar el token sin verificar la firma
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwt.decode(token);
//         // Verificar expiración del token
         if (decoded?.exp && decoded.exp < Date.now() / 1000) {
//             // Si el token ha expirado, redirige al login
             return NextResponse.redirect(new URL('/login', request.url));
        }

        // Redirigir según el rol
        console.log('Tipo de usuario:', decoded.tipo_usuario);
        switch (decoded.tipo_usuario) {
            case 'administrador':
                if (!request.nextUrl.pathname.startsWith('/admin')) {
                    return NextResponse.redirect(new URL('/admin/home', request.url));
                }
                break;
            case 'organizador':
                if (!request.nextUrl.pathname.startsWith('/organizador')) {
                    return NextResponse.redirect(new URL('/organizador', request.url));
                }
                break;
            case 'comun':
                if (!request.nextUrl.pathname.startsWith('/my')) {
                    return NextResponse.redirect(new URL('/my/profile', request.url));
                }
                break;
            case 'colaborador':
                if (!request.nextUrl.pathname.startsWith('/colaborador')) {
                    return NextResponse.redirect(new URL('/colaborador/escaner', request.url));
                }
                break;
            default:
                return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (error) {
        // Si la decodificación falla, redirige al login
        console.error('Invalid token:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Si el token es válido y no ha expirado, permite continuar
    return NextResponse.next(); // Llamar como función
}

// Configura el middleware para aplicarlo a todas las rutas
export const config = {
    matcher: [
        '/((?!api|_next|img/|pdf/|logos/|fonts/|public/|login|register|$).*)',
    ],
}; */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Expires', '0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Surrogate-Control', 'no-store');

    const token = request.cookies.get('authToken')?.value;  
       // Define las rutas públicas (que no requieren autenticación)
    const publicRoutes = ['/login', '/register', '/colaborador/informacion'];

//     // Si la ruta es pública, permite el acceso
   if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
       return NextResponse.next(); // Llamar como función
   }


    if (!token) {
        response.headers.set('Clear-Session-Storage', 'true');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwt.decode(token);

        if (decoded?.exp && decoded.exp < Date.now() / 1000) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        switch (decoded.tipo_usuario) {
            case 'administrador':
                if (!request.nextUrl.pathname.startsWith('/admin')) {
                    return NextResponse.redirect(new URL('/admin/home', request.url));
                }
                break;
            case 'organizador':
                if (!request.nextUrl.pathname.startsWith('/organizador')) {
                    return NextResponse.redirect(new URL('/organizador', request.url));
                }
                break;
            case 'comun':
                if (!request.nextUrl.pathname.startsWith('/my')) {
                    return NextResponse.redirect(new URL('/my/profile', request.url));
                }
                break;
            case 'colaborador':
                if (!request.nextUrl.pathname.startsWith('/colaborador')) {
                    return NextResponse.redirect(new URL('/colaborador/escaner', request.url));
                }
                break;
            default:
                return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
}

// Configura el middleware para aplicarlo a todas las rutas
export const config = {
    matcher: [
        '/((?!api|_next|img/|pdf/|logos/|fonts/|public/|login|register|$).*)',
    ],
}
