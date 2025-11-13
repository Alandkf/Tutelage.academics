/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Revert to default `.next` dir; avoids OneDrive lock on `build/trace`
  distDir: '.next',
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
