/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com', // Agregamos el dominio de Unsplash
        pathname: '/photos/**',                // Permitimos todas las rutas del dominio
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',     // Si necesitas otro dominio, agrégalo aquí
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;