import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/recipes',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
