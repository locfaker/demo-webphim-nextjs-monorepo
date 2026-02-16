/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['swiper'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ophim.live',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'rophimm.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.ophim1.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img.ophim1.com',
                pathname: '/**',
            }
        ],
        unoptimized: true, // Restore original quality as API images don't support resizing
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp', 'image/avif'],
    },
};

export default nextConfig;
