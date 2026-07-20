import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy para evitar CORS
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  // Configuração de imagens (se fizer upload)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.onrender.com', // Permite todas imagens do Render
      },
    ],
  },

  // Otimizações
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Build otimizado
  output: 'standalone',
};

export default nextConfig;