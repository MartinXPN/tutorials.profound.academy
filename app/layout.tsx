import './globals.css'
import {ReactNode} from "react";
import EmotionRootStyleRegistry from './EmotionRootStyleRegistry';
import ThemeProvider from "./ThemeProvider";

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <head></head>
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
