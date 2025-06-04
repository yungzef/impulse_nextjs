import withPWA from 'next-pwa'
import type { NextConfig } from 'next'

// 👇 создаём PWA-конфиг СРАЗУ внутри withPWA
const withPWAConfig = withPWA({
    dest: 'public',
    register: true,
    disable: true, // <== временно отключает PWA
    skipWaiting: true,
})

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

export default withPWAConfig(nextConfig)

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