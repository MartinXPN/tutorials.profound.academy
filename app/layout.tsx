import './globals.css'
import {ReactNode} from "react";
import {Roboto} from "next/font/google";
import '@mui/material-pigment-css/styles.css';

const font = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    variable: '--tutorials-font-family',
});

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Tutorials for Profound Academy</title>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <meta name="description" content="Interactive tutorials for Profound Academy"/>
                <link rel="icon" href="/favicon.ico"/>
            </head>

            <body className={`${font.variable}`}>
                    {children}
            </body>
        </html>
    );
}
