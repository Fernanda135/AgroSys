import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  // Configuração de imagens (se necessário)
  images: {
    domains: ['agrosys-l2ho.onrender.com'],
    // Ou use remotePatterns (recomendado)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agrosys-l2ho.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Otimizações
  reactStrictMode: true,
  poweredByHeader: false,
  
};

export default nextConfig;