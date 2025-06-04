import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        ignoreBuildErrors: true,
    },
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