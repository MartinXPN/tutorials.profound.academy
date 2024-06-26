'use client';

import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Page = () => {
    const [decimalNumber, setDecimalNumber] = useState(0);

    const increment = () => setDecimalNumber(n => n + 1);
    const decrement = () => setDecimalNumber(n => Math.max(0, n - 1));
    const reset = () => setDecimalNumber(0);

    const binaryNumber = decimalNumber.toString(2);

    return <>
        <Box display="flex" justifyContent="center" padding={4}>
            <Stack direction="row" alignItems="center" spacing={4}>
                <Stack direction="column" spacing={1}>
                    <Button variant="contained" size="small" onClick={increment}><ArrowDropUpIcon/></Button>
                    <Button variant="contained" size="small" onClick={decrement}><ArrowDropDownIcon/></Button>
                </Stack>

                <Stack direction="column" alignItems="center">
                    <Typography variant="h6">Decimal</Typography>
                    <Typography variant="h4">{decimalNumber}</Typography>
                </Stack>

                <Stack direction="column" alignItems="center">
                    <Typography variant="h6">Binary</Typography>
                    <Typography variant="h4">{binaryNumber}</Typography>
                </Stack>

                <Button variant="contained" size="small" endIcon={<AutorenewIcon/>} onClick={reset}>
                    Reset
                </Button>
            </Stack>
        </Box>
    </>
};

export default Page;
