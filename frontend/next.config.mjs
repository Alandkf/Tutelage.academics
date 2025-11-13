/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Use a custom build directory to avoid OneDrive locks on .next
  distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.coe.int'
      }
    ],
    dangerouslyAllowSVG: true, 
  },
}

export default nextConfig;
