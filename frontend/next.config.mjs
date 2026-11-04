/** @type {import('next').NextConfig} */
// LEO showcase: inherited Tutelage routes are sent back to the LEO home page.
const nonLeoRoutes = [
  '/about-us',
  '/admin-dashboard',
  '/admin-dashboard/:path*',
  '/contact',
  '/courses',
  '/courses/:path*',
  '/esl-resources',
  '/esl-resources/:path*',
  '/languages',
  '/languages/:path*',
  '/levels',
  '/levels/:path*',
  '/search',
  '/signin',
  '/skills',
  '/skills/:path*',
  '/tutelage-tests',
  '/tutelage-tests/:path*',
]

const nextConfig = {
  async redirects() {
    return nonLeoRoutes.map((source) => ({ source, destination: '/', permanent: false }))
  },
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
