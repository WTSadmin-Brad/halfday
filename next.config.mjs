/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  experimental: {
    optimizePackageImports: ['@/components/ui'],
  },
}

export default nextConfig
