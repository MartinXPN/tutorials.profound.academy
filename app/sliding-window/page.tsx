'use client';
import {memo, useState} from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FastForwardIcon from "@mui/icons-material/FastForward";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from "@mui/material/Box";

function Page() {
    const [currentWord, setCurrentWord] = useState<string>('hello, world!');
    const [left, setLeft] = useState<number>(0);
    const [right, setRight] = useState<number>(0);
    const [bestLength, setBestLength] = useState<number>(1);
    const [letters, setLetters] = useState<string[]>(['h']);

    if( letters.length > bestLength )
        setBestLength(letters.length);

    const onGenerateNewClicked = () => {
        const length = Math.floor(Math.random() * 20) + 1;
        const letters = 'abcdefghijklmnopqrstuvwxyz -';
        let word = '';
        for (let i = 0; i < length; i++) {
            word += letters[Math.floor(Math.random() * letters.length)];
        }
        setCurrentWord(word);
        setLeft(0);
        setRight(0);
        setLetters([word[0]]);
        setBestLength(1);
    }
    const onNextClicked = () => {
        const r = right + 1;
        let l = left;
        if( r >= currentWord.length )
            return;

        const newLetters = [...letters];

        while( newLetters.includes(currentWord[r]) ) {
            // remove currentWord[l] from letters
            const index = newLetters.indexOf(currentWord[l]);
            newLetters.splice(index, 1);
            l++;
        }

        setLetters([...newLetters, currentWord[r]]);
        setRight(r);
        setLeft(l);
    }

    console.log(document?.body?.style?.backgroundColor);

    return <>
        <Stack direction="column" alignItems="center" alignContent="center">
            <Box position="relative" width="100%">
            <Stack direction="row" alignItems="center" marginY={5} sx={{ overflowX: 'auto' }}>
                <Box flex={1} />
                {currentWord.split('').map((letter, index) => (
                    <Stack marginX={2} direction="column" alignContent="center" alignItems="center" key={`letter-${index}-${letter}`}>
                        <Typography color="neutral.contrastText" variant="caption" marginBottom={-1} visibility={left === index ? 'visible' : 'hidden'}>left</Typography>
                        <ArrowDropDownIcon color="disabled" visibility={left === index ? 'visible' : 'hidden'} />
                        <Typography color="neutral.contrastText" variant="caption">{index}</Typography>
                        <Typography color="neutral.contrastText" variant="h3" fontWeight="bold">{letter}</Typography>
                        <ArrowDropUpIcon color="disabled" visibility={right === index ? 'visible' : 'hidden'} />
                        <Typography color="neutral.contrastText" variant="caption" marginTop={-1} visibility={right === index ? 'visible' : 'hidden'}>right</Typography>
                    </Stack>
                ))}
                <Box flex={1} />
            </Stack>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained" startIcon={<AutorenewIcon />} onClick={onGenerateNewClicked} size="small" sx={{bgcolor: 'white', color: 'neutral.contrastText'}}>Generate new</Button>
                <Button variant="contained" endIcon={<FastForwardIcon />} onClick={onNextClicked} size="small" disabled={right === currentWord.length - 1}>Next</Button>
                <Typography variant="body2" color="neutral.contrastText">Best length: {bestLength}</Typography>
            </Stack>
        </Stack>
    </>
}

export default memo(Page);
