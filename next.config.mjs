/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger managed Node.js supports full SSR — no static export needed
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure trailing slashes handled consistently
  trailingSlash: false,
};

export default nextConfig;
