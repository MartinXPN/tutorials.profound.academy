'use client';

import {memo, createContext, ReactNode, useState, useEffect} from "react";
import {ThemeProvider as MuiThemeProvider, createTheme} from "@mui/material/styles";
import {useStickyState} from "./stickystate";
import Head from "next/head";

export type PaletteMode = 'light' | 'dark';

const getDesignTokens = (mode: PaletteMode) => ({
    typography: {
        h1: {fontSize: 42, fontWeight: 'bold'},
        h2: {fontSize: 30},
        h3: {fontSize: 26},
        h4: {fontSize: 20},
        h5: {fontSize: 18},
        h6: {fontSize: 16},
    },
    ...(mode === 'light'
        ? {
            palette: {
                mode: mode,
                background: {default: '#ffffff', paper: '#ffffff'},
                primary: {main: '#4B5FAA'},
                secondary: {main: '#0F1729'},
                info: {main: '#f44336'},
                success: {main: '#4caf50'},
                error: {main: '#f44336'},

                console: {main: '#e0e0e0'},
                secondaryAction: {main: '#000000'},
                neutral: {main: '#ffffff', contrastText: '#212121'},
                unavailable: {main: '#363636'},
            },
        }
        : {
            palette: {
                mode: mode,
                background: {default: '#171717', paper: '#212121'},
                primary: {main: '#4B5FAA'},
                secondary: {main: '#0F1729'},
                info: {main: '#f44336'},
                success: {main: '#388e3c'},
                error: {main: '#d32f2f'},

                console: {main: '#212121'},
                secondaryAction: {main: '#fff'},
                neutral: {main: '#212121', contrastText: '#fff'},
                unavailable: {main: '#797979'},
            },
        }),
});

interface ColorModeContextProps {
    mode: PaletteMode;
    setMode: (mode: PaletteMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
    mode: 'light',
    setMode: (_: PaletteMode) => {},
});

function ThemeProvider({children}: {children: ReactNode}) {
    const [mode, setMode] = useStickyState<PaletteMode>('light', 'app-mode');

    // For server-side rendering (it does not have access to the user-preferred theme => we reload it on the client-side)
    const [currentMode, setCurrentMode] = useState<PaletteMode>('light');
    const [theme, setTheme] = useState(createTheme(getDesignTokens('light')));

    useEffect(() => {
        const currentTheme = createTheme(getDesignTokens(mode));
        setTheme(currentTheme);
        setCurrentMode(mode);
    }, [mode]);

    return <>
        <Head>
            {/* PWA primary color */}
            <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>

        <ColorModeContext.Provider value={{mode: currentMode, setMode: setMode}}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ColorModeContext.Provider>
    </>
}

export default memo(ThemeProvider);
