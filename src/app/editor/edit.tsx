'use client'
import Left from "./left"
import Right from "./right"
import { Box } from "@mui/material";
import { DNDProvider } from "./center/DNDProvider";
import Center from './center'

const EditorPage = () => {
    return (
        <DNDProvider>
            <Box className="flex flex-row justify-between h-full"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr 300px'
                }}
            >
                <Left />

                <Center />

                <Right />
            </Box>
        </DNDProvider>
    );
};

export default EditorPage;