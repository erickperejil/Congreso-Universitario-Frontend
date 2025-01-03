/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Agregamos el dominio de Unsplash
        pathname: '/**',                // Permitimos todas las rutas del dominio
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',     // Si necesitas otro dominio, agrégalo aquí
        pathname: '/**',
      },
      
    ],
    domains: ['1.bp.blogspot.com','res.cloudinary.com'],
  },
};

export default nextConfig;
