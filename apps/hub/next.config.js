/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: 'https://resume.neographer.co.in',
        permanent: true,
      },
      {
        source: '/collections',
        destination: 'https://collections.neographer.co.in',
        permanent: true,
      },
      {
        source: '/ppc',
        destination: 'https://collections.neographer.co.in/ppc',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
