import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    productionBrowserSourceMaps: true,
}

// 👇 redirects отдельно!
export async function redirects() {
    return [
        {
            source: '/auth/google/callback',
            destination: '/auth/callback',
            permanent: true,
        },
    ]
}