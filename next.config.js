/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                // Dirty hack to support SVG files (somevg in our case): https://github.com/vercel/next.js/issues/48140
                '*.somevg': ['@svgr/webpack'],
            }
        }
    },
}

module.exports = nextConfig
