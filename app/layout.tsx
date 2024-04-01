import './globals.css'
import {ReactNode} from "react";
import EmotionRootStyleRegistry from './EmotionRootStyleRegistry';
import ThemeProvider from "./ThemeProvider";

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

            <body>
                <EmotionRootStyleRegistry>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
                </EmotionRootStyleRegistry>
            </body>
        </html>
    );
}
