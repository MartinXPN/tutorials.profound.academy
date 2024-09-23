'use client';

import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

function Page() {
    const [n, setN] = useState<number>(101);
    const [prime, setPrime] = useState<number[]>([]);   // -1 => not prime, 0 => unknown, 1 => prime

    useEffect(() => {
        // Initially all the numbers [2...n) are prime
        const isPrime = new Array(n).fill(0);
        isPrime[0] = isPrime[1] = -1;
        setPrime(isPrime);
    }, [n, setPrime]);

    const onGenerateNewClicked = () => {
        setN(Math.floor(Math.random() * 250) + 2);
    }
    const onNumberClicked = (i: number) => {
        if( prime[i] === -1 )
            return;

        const newPrime = [...prime];
        newPrime[i] = 1;

        // Mark all multiples of i as not prime
        for (let j = i * 2; j < n; j += i)
            newPrime[j] = -1;
        setPrime(newPrime);
    }

    return <>
        <Stack direction="column" alignItems="center" alignContent="center">
            <Grid container>
                {prime.map((p, i) => <Grid key={`prime-${i}`}>
                    <ToggleButton value={i} selected={p === 1} disabled={p === -1} onClick={() => onNumberClicked(i)}
                                  sx={{transitionDelay: `${i}0ms`, width: 50}}>
                        <Typography fontWeight="bold">{i}</Typography>
                    </ToggleButton>
                </Grid>)}
            </Grid>

            <Stack direction="row" spacing={2} alignItems="center" marginY={2}>
                <Button variant="outlined" startIcon={<AutorenewIcon />} onClick={onGenerateNewClicked} size="small">
                    Generate New
                </Button>
            </Stack>
        </Stack>
    </>
}

export default Page;
