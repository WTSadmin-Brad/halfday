/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required for konva
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
