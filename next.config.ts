import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4566',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
