'use client'
import Left from "./left"
import Right from "./right"
import { Box } from "@mui/material";
import { EditorCanvas } from '@/app/components/editor/EditorCanvas'
import { EditorShell } from "../components/editor/EditorShell";

const EditorPage = () => {
    return (
        <EditorShell>
            <Box className="flex flex-row justify-between h-full"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr 300px'
                }}
            >
                <Left />

                <EditorCanvas />

                <Right />
            </Box>
        </EditorShell>


    );
};

export default EditorPage;