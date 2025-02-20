'use client';

import {memo, ReactNode} from "react";
import {ThemeProvider as MuiThemeProvider, createTheme} from "@mui/material/styles";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import {Roboto} from "next/font/google";
import {CssBaseline} from "@mui/material";

const font = Roboto({weight: ['300', '400', '500', '700'], subsets: ['latin']});



const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: font.style.fontFamily,
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
});


function ThemeProvider({children}: {children: ReactNode}) {
    return <>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
        </AppRouterCacheProvider>
    </>
}

export default memo(ThemeProvider);
