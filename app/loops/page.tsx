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
    const numbers = [-2, 7, 0, 1, -5, 4, 9, -8];
    const [n, setN] = useState(-1);
    const [stage, setStage] = useState<'n' | 'newN' | 'square' | 'total' | 'print1' | 'print2' | 'done'>('n');
    const highlightLine = stage === 'n' ? 3 : stage === 'newN' ? 3 : stage === 'square' ? 4 : stage === 'total' ? 5 : stage === 'print1' ? 6 : stage === 'print2' ? 7 : 9;
    const total = numbers.slice(0, numbers.indexOf(n) + 1).reduce((acc, cur) => acc + cur * cur, 0);


    const onNextClicked = () => {
        if (stage === 'n') {
            setStage('newN');
            const index = numbers.indexOf(n);
            if (0 <= index && index < numbers.length - 1)
                setN(numbers[index + 1]);
            else
                setN(numbers[0]);
        }
        else if (stage === 'newN') {
            setStage('square');
        }
        else if (stage === 'square')
            setStage('total');
        else if (stage === 'total')
            setStage('print1');
        else if (stage === 'print1')
            setStage('print2');
        else if (stage === 'print2') {
            const index = numbers.indexOf(n);
            if (index < numbers.length - 1)
                setStage('n');
            else
                setStage('done');
        }
    };

    const reset = () => {
        setN(-1);
        setStage('n');
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
    }, [codeRef, highlightLine, stage]);

    return <>
        <Box display="flex" justifyContent="center" alignItems="center">
        <Box padding={1} sx={{overflowX: 'auto'}}>
            <pre data-line={`${highlightLine}`} style={{paddingLeft: '30px'}}>
                <code className="language-python" ref={codeRef}>{endent`
                    numbers = [-2, 7, 0, 1, -5, 4, 9, -8]
                    total = 0
                    for n in numbers:                   # n = ${n === -1 ? '-' : n}
                        square = n ** 2                 # square = ${n === -1 || ['n', 'newN'].includes(stage) ? '-' : n ** 2}
                        total += square                 # total = ${n === -1 || ['n', 'newN', 'square'].includes(stage) ? '-' : total}
                        print(f'n^2 = {square}')        # ${n === -1 || ['n', 'newN', 'square', 'total'].includes(stage) ? '' : `n^2 = ${n ** 2}`}
                        print(f'Total: {total}')        # ${n === -1 || ['n', 'newN', 'square', 'total', 'print1'].includes(stage)
                            ? '' 
                            : `Total: ${total}`}
                    
                    print('Done!')                      # ${stage !== 'done' ? '             .' : 'Done!        .'}
                `}</code>
            </pre>

            <Box display="flex" justifyContent="center" padding={1}>
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
