'use client'
import { useDrag } from 'react-dnd';
import { Box } from "@mui/material";

import { ComponentPalette } from '@/app/editor/center/ComponentPalette'


const Left = () => {

    return (
        <Box
            sx={{
                border: '1px solid red'
            }}
        >
            <ComponentPalette />
        </Box>
    );
};

export default Left;