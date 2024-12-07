/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  experimental: {
    optimizePackageImports: ["@/components/ui"],
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
