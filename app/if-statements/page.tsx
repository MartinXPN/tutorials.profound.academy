'use client';

import {useEffect, useRef, useState} from 'react';
import {highlightElement} from 'prismjs';
import 'prismjs/components/prism-python.min.js';
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import 'prismjs/themes/prism.min.css';
import endent from "endent";
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SkipNextIcon from '@mui/icons-material/SkipNext';


function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const Page = () => {
    const codeRef = useRef(null);
    const [line, setLine] = useState(1);
    const [thirst, setThirst] = useState(77);
    const [price, setPrice] = useState(100);


    const onNextClicked = () => {
        if (line === 2)
            return setLine(4);
        if (line == 5)
            return setLine(thirst > 30 ? 6 : 9);
        if (line === 7)
            return setLine(9);

        setLine(line + 1);
    };

    const reset = () => {
        setLine(1);
        setThirst(randInt(1, 70));
        setPrice(randInt(10, 100));
    }


    useEffect(() => {
        if (!codeRef.current)
            return console.warn('No current ref...');
        try {
            highlightElement(codeRef.current);
        }
        catch (err) {
            console.warn('prismjs highlight error', err);
        }
    }, [codeRef, line]);

    return <>
        <Box display="flex" justifyContent="center" alignItems="center">
        <Box padding={1} sx={{overflowX: 'auto'}}>
            <pre data-line={`${line}`} style={{paddingLeft: '30px'}}>
                <code className="language-python" ref={codeRef}>{endent`
                    thirst = ${thirst}
                    price = ${price}
                    
                    payment = 0
                    if thirst > 30:
                        payment = price
                        thirst = 0
                    
                    print('We paid:', payment, 'and thirst levels are:', thirst)
                    # ${line === 9 ? `We paid: ${thirst > 30 ? price : 0} and thirst levels are: ${thirst}` : ''}
                `}</code>
            </pre>

            <Box display="flex" justifyContent="center" padding={1}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" size="small" endIcon={<SkipNextIcon/>} onClick={onNextClicked} disabled={line === 9}>
                        Next
                    </Button>
                    <Button variant="outlined" size="small" endIcon={<AutorenewIcon/>} onClick={reset}>
                        Reset
                    </Button>
                </Stack>
            </Box>
        </Box>
        </Box>
    </>
};

export default Page;
