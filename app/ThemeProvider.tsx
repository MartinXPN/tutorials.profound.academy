'use client';

import {memo, ReactNode} from "react";
import {ThemeProvider as MuiThemeProvider, createTheme} from "@mui/material/styles";
import {Roboto} from "next/font/google";

const font = Roboto({weight: ['300', '400', '500', '700'], subsets: ['latin']});


const getDesignTokens = () => ({
    typography: {
        fontFamily: font.style.fontFamily,
        h1: {fontSize: 42, fontWeight: 'bold', fontFamily: font.style.fontFamily},
        h2: {fontSize: 30, fontFamily: font.style.fontFamily},
        h3: {fontSize: 26, fontFamily: font.style.fontFamily},
        h4: {fontSize: 20, fontFamily: font.style.fontFamily},
        h5: {fontSize: 18, fontFamily: font.style.fontFamily},
        h6: {fontSize: 16, fontFamily: font.style.fontFamily},
        subtitle1: {fontFamily: font.style.fontFamily},
        subtitle2: {fontFamily: font.style.fontFamily},
        body1: {fontFamily: font.style.fontFamily},
        body2: {fontFamily: font.style.fontFamily},
        button: {fontFamily: font.style.fontFamily},
        caption: {fontFamily: font.style.fontFamily},
        overline: {fontFamily: font.style.fontFamily},
    },
    palette: {
        background: {default: '#ffffff', paper: '#ffffff'},
        primary: {main: '#212b36'},
        secondary: {main: '#fa541c'},
        info: {main: '#f44336'},
        success: {main: '#4caf50'},
        error: {main: '#f44336'},

        secondaryAction: {main: '#000000'},
        neutral: {main: '#ffffff', contrastText: '#212121'},
        unavailable: {main: '#363636'},
    },
});

const theme = createTheme(getDesignTokens());


function ThemeProvider({children}: {children: ReactNode}) {


    return <>
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    </>
}

export default memo(ThemeProvider);
