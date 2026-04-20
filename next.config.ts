import type {NextConfig} from 'next';

const config: NextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    skipTrailingSlashRedirect: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default config;
