/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.somevg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
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
