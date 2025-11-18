/**
 * Next.js config additions for cache headers and image optimization
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow external images if needed
    domains: ['assets.calendly.com', 'calendly.com', 'images.unsplash.com']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
