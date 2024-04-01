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


const Page = () => {
    const codeRef = useRef(null);
    const [h, setH] = useState(-1);
    const [m, setM] = useState(-1);
    const [s, setS] = useState(-1);
    const [stage, setStage] = useState<'h' | 'm' | 's' | 'print'>('h');
    const highlightLine = stage === 'h' ? 1 : stage === 'm' ? 2 : stage === 's' ? 3 : 4;


    // Emulate the clock
    const onNextClicked = () => {
        if (stage === 'h') {
            setH(h => h + 1);
            setM(-1);
            setS(-1);
            setStage('m');
        }
        else if (stage === 'm') {
            if (m === 9)
                return setStage('h');
            setM(m => m + 1);
            setS(-1);
            setStage('s');
        }
        else if (stage === 's') {
            if (s == 9)
                return setStage('m');
            setS(s => s + 1);
            setStage('print');
        }
        else {
            setStage('s');
        }
    };

    const reset = () => {
        setH(-1);
        setM(-1);
        setS(-1);
        setStage('h');
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
    }, [codeRef, highlightLine]);

    return <>
        <Box display="flex" justifyContent="center" padding={4}>
        <Box>
            <pre data-line={`${highlightLine}`} style={{paddingLeft: '30px'}}>
                <code className="language-python" ref={codeRef}>
                    {endent`
                        for h in range(24):                         # h = ${h === -1 ? '-' : h}
                            for m in range(10):                     # m = ${m === -1 ? '-' : m}
                                for s in range(10):                 # s = ${s === -1 ? '-' : s}
                                    print(f'Time: {h}:{m}:{s}')     # ${h !== -1 && m !== -1 && s !== -1 && stage === 'print' ? `Time: ${h}:${m}:${s}` : '          .'}
                    `}
                </code>
            </pre>

            <Box display="flex" justifyContent="center" padding={2}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" size="small" endIcon={<SkipNextIcon/>} onClick={onNextClicked}>
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
