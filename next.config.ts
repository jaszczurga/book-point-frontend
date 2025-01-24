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
            {
                protocol: "https",
                hostname: "books.google.com", // Specifically allow books.google.com
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "books.google.com", // Specifically allow books.google.com
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
