const {withPigment} = require('@pigment-css/nextjs-plugin');
const {createTheme} = require('@mui/material');


/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
}

const pigmentConfig = {
    transformLibraries: ['@mui/material'],
    theme: createTheme({
        cssVariables: true,
        typography: {
            fontFamily: 'var(--tutorials-font-family)',
            h1: {fontSize: 42, fontWeight: 'bold'},
            h2: {fontSize: 30},
            h3: {fontSize: 26},
            h4: {fontSize: 20},
            h5: {fontSize: 18},
            h6: {fontSize: 16},
        },
        palette: {
            background: {default: '#ffffff', paper: '#ffffff'},
            primary: {main: '#212b36'},
            secondary: {main: '#fa541c'},
            info: {main: '#f44336'},
            success: {main: '#4caf50'},
            error: {main: '#f44336'},
        },
    })
};
module.exports = withPigment(nextConfig, pigmentConfig);
