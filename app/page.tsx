'use client';

import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import Logo from "./assets/Logo";
import Stack from "@mui/material/Stack";


function Page() {
    return <>
        <Stack direction="column" spacing={5} sx={{alignItems: "center", alignContent: "center", width: "100%", paddingY: 10}}>
            <SvgIcon sx={{fontSize: 100}}><Logo /></SvgIcon>
            <Typography variant="h1" sx={{textAlign: "center"}}>
                Interactive tutorials for Profound Academy
            </Typography>
        </Stack>
    </>
}

export default Page;
